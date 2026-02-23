"use client";

import React, { useState } from "react";
import Button from "./Button";
import { supabase } from "@/lib/supabase";

export default function WaitingListForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "user" as "user" | "merchant",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const { error } = await supabase.from("waiting_list").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          user_type: formData.userType,
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", userType: "user" });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-ubuntu mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl border border-ubuntu/20 focus:outline-none focus:ring-2 focus:ring-sahara bg-white"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-ubuntu mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 rounded-xl border border-ubuntu/20 focus:outline-none focus:ring-2 focus:ring-sahara bg-white"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-ubuntu mb-2"
        >
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+234 801 234 5678"
          className="w-full px-4 py-3 rounded-xl border border-ubuntu/20 focus:outline-none focus:ring-2 focus:ring-sahara bg-white"
        />
      </div>

      <div>
        <label
          htmlFor="userType"
          className="block text-sm font-medium text-ubuntu mb-2"
        >
          I want to join as
        </label>
        <select
          id="userType"
          name="userType"
          required
          value={formData.userType}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-ubuntu/20 focus:outline-none focus:ring-2 focus:ring-sahara bg-white"
        >
          <option value="user">User (Bitcoiner)</option>
          <option value="merchant">Merchant</option>
        </select>
      </div>

      {submitStatus === "success" && (
        <div className="p-4 bg-forest/10 text-forest rounded-lg border border-forest/20">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Successfully joined the waiting list!</span>
          </div>
          <p className="text-sm mt-2">We'll notify you as soon as the app is available.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-sunset/10 text-sunset rounded-lg border border-sunset/20">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-medium">Something went wrong</span>
          </div>
          <p className="text-sm mt-2">Please try again later.</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Joining...
          </span>
        ) : (
          "Join Waiting List"
        )}
      </Button>
    </form>
  );
}

