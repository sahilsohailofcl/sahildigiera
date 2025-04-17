"use client";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Billing & Subscription</h1>
      
      {/* Current Plan */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-[#50a826]">Growth Plan</p>
            <p className="text-white/60">$499/month</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#50a826] text-white hover:bg-[#317e31] transition-colors">
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
            <span className="text-white">💳</span>
          </div>
          <div>
            <p className="font-medium">Visa ending in 4242</p>
            <p className="text-white/60">Expires 12/24</p>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Billing History</h2>
        <div className="space-y-4">
          {[
            { date: "Oct 1, 2023", amount: "$499.00", status: "Paid" },
            { date: "Sep 1, 2023", amount: "$499.00", status: "Paid" },
            { date: "Aug 1, 2023", amount: "$499.00", status: "Paid" },
          ].map((invoice, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
              <div>
                <p className="font-medium">{invoice.date}</p>
                <p className="text-white/60">{invoice.amount}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-[#317e31]/20 text-[#50a826]">
                {invoice.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 