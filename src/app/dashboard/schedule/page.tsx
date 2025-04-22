"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  SpeakerWaveIcon,
  GlobeAltIcon,
  ClockIcon as ClockIconSolid,
} from "@heroicons/react/24/outline";

// Available time slots (in 30-minute intervals)
const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

// Available timezones
const timezones = [
  { value: "UTC", label: "UTC (Coordinated Universal Time)" },
  { value: "EST", label: "EST (Eastern Standard Time)" },
  { value: "CST", label: "CST (Central Standard Time)" },
  { value: "MST", label: "MST (Mountain Standard Time)" },
  { value: "PST", label: "PST (Pacific Standard Time)" },
  { value: "GMT", label: "GMT (Greenwich Mean Time)" },
  { value: "IST", label: "IST (Indian Standard Time)" },
];

// Call durations
const durations = [
  { value: "15", label: "15 minutes" },
  { value: "20", label: "20 minutes" },
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
];

export default function ScheduleCallPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    timezone: "UTC",
    duration: "30",
    callType: "video",
    topic: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Schedule call data:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormData(prev => ({
      ...prev,
      date: date.toISOString().split('T')[0]
    }));
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const today = new Date();
    const currentMonth = selectedDate ? selectedDate.getMonth() : today.getMonth();
    const currentYear = selectedDate ? selectedDate.getFullYear() : today.getFullYear();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeftIcon className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Schedule a Call</h1>
          <p className="text-white/60 mt-1">Book a meeting with our team</p>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 rounded-xl p-6 border border-white/10"
        >
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-[#50a826]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalendarIcon className="w-8 h-8 text-[#50a826]" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Call Scheduled!</h2>
            <p className="text-white/60 mb-6">
              We've received your request and will confirm the call details via email shortly.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
              >
                Schedule Another Call
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-6">Call Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Your Name</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-white/40" />
                      </div>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-white/40" />
                      </div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-white/40" />
                      </div>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-white">Call Topic</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ChatBubbleLeftRightIcon className="h-5 w-5 text-white/40" />
                      </div>
                      <Input
                        id="topic"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder="What would you like to discuss?"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-white">Timezone</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <GlobeAltIcon className="h-5 w-5 text-white/40" />
                      </div>
                      <select
                        id="timezone"
                        name="timezone"
                        value={formData.timezone}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#50a826] focus:border-transparent"
                        required
                      >
                        {timezones.map((tz) => (
                          <option key={tz.value} value={tz.value} className="bg-gray-900 text-white">
                            {tz.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-white">Call Duration</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ClockIconSolid className="h-5 w-5 text-white/40" />
                      </div>
                      <select
                        id="duration"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white pl-10 appearance-none focus:outline-none focus:ring-2 focus:ring-[#50a826] focus:border-transparent"
                        required
                      >
                        {durations.map((duration) => (
                          <option key={duration.value} value={duration.value} className="bg-gray-900 text-white">
                            {duration.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="callType" className="text-white">Call Type</Label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="callType"
                          value="video"
                          checked={formData.callType === "video"}
                          onChange={handleChange}
                          className="form-radio text-[#50a826] bg-white/10 border-white/20"
                        />
                        <span className="text-white flex items-center gap-1">
                          <VideoCameraIcon className="h-5 w-5" />
                          Video Call
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="callType"
                          value="audio"
                          checked={formData.callType === "audio"}
                          onChange={handleChange}
                          className="form-radio text-[#50a826] bg-white/10 border-white/20"
                        />
                        <span className="text-white flex items-center gap-1">
                          <SpeakerWaveIcon className="h-5 w-5" />
                          Audio Call
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-white">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any additional information you'd like to share"
                    rows={4}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#50a826] text-white hover:bg-[#50a826]/80 border-none"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Call"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Select Date & Time</h2>
              
              {/* Calendar */}
              <div className="mb-6">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-white/60 text-sm py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && handleDateSelect(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${
                        day
                          ? selectedDate?.toDateString() === day.toDateString()
                            ? "bg-[#50a826] text-white"
                            : "text-white/60 hover:bg-white/10"
                          : "invisible"
                      }`}
                      disabled={!day}
                    >
                      {day?.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <Label htmlFor="time" className="text-white mb-2 block">Select Time</Label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, time }))}
                      className={`p-2 rounded-lg text-sm transition-colors ${
                        formData.time === time
                          ? "bg-[#50a826] text-white"
                          : "bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-lg font-semibold text-white mb-4">Meeting Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <VideoCameraIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Video Call</h3>
                    <p className="text-white/60 text-sm">We'll use Google Meet for video calls</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <ClockIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Duration</h3>
                    <p className="text-white/60 text-sm">Standard meeting duration is 30 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#50a826]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <GlobeAltIcon className="w-5 h-5 text-[#50a826]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Timezone</h3>
                    <p className="text-white/60 text-sm">All times are shown in your local timezone</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
} 