import Stripe from "stripe";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Subscription } from "../models/Subscription.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";


const stripe =new Stripe('sk_test_51MM2bXEUzOIjs385qeyS5LOwuLcEIhKbcApMs5qIL1xVqRyo0v9UTQEV5N9dzUoO7ZGxK7rhFp9sFPogBDIVoGzE002s7h3wEx');


export const subscribe = catchAsyncError(async (req, res, next) =>{
    const {paymentMethodId}=req.body
    const user = await User.findById(req.user._id);



   if (!paymentMethodId) return   next(new ErrorHandler("Required Data Missing", 400));

    if (user.role === "admin")
      return next(new ErrorHandler("Admin can't buy subscription", 400));

    // create customer
    const customer = await stripe.customers.create({
        email:user.email,
        name:user.name,
        payment_method: paymentMethodId,
        invoice_settings: {
            default_payment_method: paymentMethodId
          }
    })

    // Create a subscription for the customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: 'price_1MbgGKEUzOIjs3852Y3sVTBH' }],
      expand: ['latest_invoice.payment_intent']
    });

 
    user.subscription.id = subscription.id;

    user.subscription.status = subscription.status;

    await user.save();


    const stripe_payment_id= subscription.latest_invoice.payment_intent.id
    const  stripe_invoice= subscription.latest_invoice.payment_intent.invoice
    const stripe_subscription_id= subscription.id

    // database comes here
    await Subscription.create({
      stripe_invoice,
      stripe_payment_id,
      stripe_subscription_id,
    });

    // send back the client secret
    res.status(200).json({
        success:true,
        message:'Subscription successful',
        payment_id: subscription.latest_invoice.payment_intent.id,
        subscriptionId:subscription.id
       })
})  

export const cancelSubscribe = catchAsyncError(async (req, res, next) =>{
  const user = await User.findById(req.user._id)
  const subscriptionId = user?.subscription?.id

  const cancelSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  const payment = await Subscription.findOne({
    stripe_subscription_id: subscriptionId,
  });

  const gap = Date.now() - payment.createdAt;

  const refundTime = 7 * 24 * 60 * 60 * 1000;

  if (refundTime > gap) {
    const refund = await stripe.refunds.create({
    payment_intent:payment.stripe_payment_id,
    })
  }
  await payment.remove();
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  res.status(200).json({
    success:true,
    message:'Subscription canceled',
    })
})
       