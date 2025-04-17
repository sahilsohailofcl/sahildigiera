"use client";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Support</h1>
      
      {/* Create Ticket */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Create Support Ticket</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826]"
              placeholder="Enter ticket subject"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg focus:outline-none focus:border-[#50a826] min-h-[120px]"
              placeholder="Describe your issue"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#50a826] text-white rounded-lg hover:bg-[#317e31] transition-colors"
          >
            Submit Ticket
          </button>
        </form>
      </div>

      {/* Active Tickets */}
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Active Tickets</h2>
        <div className="space-y-4">
          {[
            { id: "T-1234", subject: "API Integration Issue", status: "Open", date: "2 hours ago" },
            { id: "T-1233", subject: "Billing Question", status: "In Progress", date: "1 day ago" },
            { id: "T-1232", subject: "Feature Request", status: "Resolved", date: "3 days ago" },
          ].map((ticket) => (
            <div key={ticket.id} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white/60">{ticket.id}</span>
                  <h3 className="font-medium">{ticket.subject}</h3>
                </div>
                <p className="text-sm text-white/60">{ticket.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                ticket.status === "Open" 
                  ? "bg-yellow-500/20 text-yellow-500"
                  : ticket.status === "In Progress"
                  ? "bg-blue-500/20 text-blue-500"
                  : "bg-[#317e31]/20 text-[#50a826]"
              }`}>
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 