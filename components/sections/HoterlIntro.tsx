'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link"
import Countdown from '../elements/Countdown'
import './HotelStyl.css'

export default function HoterlIntro() {
	const currentTime = new Date()
    return (
    <>
    <div className="class_main_slider_sec shadow-700 pt-10">
  <div className="main_d2l_section p-8 pt-4">
    <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
      <div className="flex flex-col ">
        
        <p className="text-m font-bold text-gray-900">INTRODUCING</p>
        <br />
        <span className="text-4xl font-medium text-yellow-300">
          MMT Luxe Selections
        </span>
        <br />
        
        <p className="">
          Escape to the epitome of luxury, packed with signature amenities and
          services
        </p>
        
      </div>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden aft_hvr">
        <div className="flex-shrink-0">
          {" "}
          <img
            className="h-48 w-full object-cover"
            src="https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2a83e4b032e338f11b77.jpg?cityName=Jaipur"
            alt=""
          />{" "}
        </div>
        <div className="flex-1 bg-white p-3 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                {" "}
                Luxe properties
              </a>
            </p>{" "}
            <a href="#" className="block">
              <p className="text-xl font-semibold text-gray-900">
                Jaipur, Rajasthan
              </p>
              {/* <p class="mt-1 text-base text-gray-500">Lorem ipsum .</p> */}
            </a>
          </div>
          <div className="mt-6 flex items-center relative">
            <div className="flex items-center w-full justify-between">
              <div>
                <span className="text-bold font-bold text-gray-900">
                  ₹2,100
                </span>
                <span className="text-sm font-bold text-gray-600">onwards</span>
              </div>
              <div className="p-3 rounded-lg text-sm font-bold text-black br_ddke23">
                Book Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden aft_hvr">
        <div className="flex-shrink-0">
          {" "}
          <img
            className="h-48 w-full object-cover"
            src="https://images-cf.ixigo.workers.dev/v2/images_by_id/503b2ab5e4b032e338f191ed.jpg?cityName=Dehradun"
            alt=""
          />{" "}
        </div>
        <div className="flex-1 bg-white p-3 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                {" "}
                Luxe Villas
              </a>
            </p>{" "}
            <a href="#" className="block">
              <p className="text-xl font-semibold text-gray-900">
                Bathinda , Punjab
              </p>
              {/* <p class="mt-1 text-base text-gray-500">Lorem ipsum .</p> */}
            </a>
          </div>
          <div className="mt-6 flex items-center relative">
            <div className="flex items-center w-full justify-between">
              <div>
                <span className="text-bold font-bold text-gray-900">
                  ₹3,000
                </span>
                <span className="text-sm font-bold text-gray-600">onwards</span>
              </div>
              <div className="p-3 rounded-lg text-sm font-bold text-black br_ddke23">
                Book Now
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-lg shadow-lg overflow-hidden aft_hvr">
        <div className="flex-shrink-0">
          {" "}
          <img
            className="h-48 w-full object-cover"
            src="https://images-cf.ixigo.workers.dev/v2/images_by_id/57591a58bad3eb1cba5b0636.jpg?cityName=Khajuraho"
            alt=""
          />{" "}
        </div>
        <div className="flex-1 bg-white p-3 flex flex-col justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-indigo-600">
              <a href="#" className="hover:underline">
                {" "}
                Luxe International{" "}
              </a>
            </p>{" "}
            <a href="#" className="block">
              <p className="text-xl font-semibold text-gray-900">
                Dubai, Maldives &amp; More
              </p>
              {/* <p class="mt-1 text-base text-gray-500">Lorem ipsum .</p> */}
            </a>
          </div>
          <div className="mt-6 flex items-center relative">
            <div className="flex items-center w-full justify-between">
              <div>
                <span className="text-bold font-bold text-gray-900">
                  ₹10,000
                </span>
                <span className="text-sm font-bold text-gray-600">onwards</span>
              </div>
              <div className="p-3 rounded-lg text-sm font-bold text-black br_ddke23">
                Book Now
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}
