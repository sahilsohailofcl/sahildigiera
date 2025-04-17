"use client";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid gap-6">
        {[1, 2, 3].map((project) => (
          <div key={project} className="bg-white/5 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold">Project {project}</h2>
                <p className="text-white/60">Last updated 2 days ago</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm bg-[#317e31]/20 text-[#50a826]">
                Active
              </span>
            </div>
            <div className="space-y-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#50a826] rounded-full"
                  style={{ width: `${30 + project * 20}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Progress</span>
                <span className="text-white">{30 + project * 20}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 