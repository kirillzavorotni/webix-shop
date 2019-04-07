<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\DeliveryType;
use App\PaymentType;
use App\OrderStat;

class PayTypesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getDelivery()
    {
        $deliveryTypes = DeliveryType::all();
        return response()->json($deliveryTypes, 200);
    }

    public function getPayment()
    {
        $paymentTypes = PaymentType::all();
        return response()->json($paymentTypes, 200);
    }

    public function getStatus()
    {
        $statuses = OrderStat::all();
        return response()->json($statuses, 200);
    }
}
