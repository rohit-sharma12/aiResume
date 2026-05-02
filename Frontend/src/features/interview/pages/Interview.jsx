import React, { useState, useEffect } from "react";
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'


const Interview = () => {
  const [active, setActive] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);
  const { report, getReportById, loading } = useInterview()
  const { interviewId } = useParams()


  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])



  if (loading || !report) {
    return (
      <main className='loading-screen'>
        <h1>Loading your interview plan...</h1>
      </main>
    )
  }


  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f172a] border-r border-gray-800 p-6 flex flex-col justify-between">
        <div>
          <ul className="space-y-3">
            <li
              className="font-bold txet-white"
            >
              Section
            </li>
            <li
              onClick={() => setActive("technical")}
              className={`cursor-pointer px-3 py-2 rounded ${active === "technical"
                ? "bg-purple-600/20 text-purple-400"
                : "text-gray-400"
                }`}
            >
              Technical Questions
            </li>
            <li
              onClick={() => setActive("behavioral")}
              className={`cursor-pointer px-3 py-2 rounded ${active === "behavioral"
                ? "bg-purple-600/20 text-purple-400"
                : "text-gray-400"
                }`}
            >
              Behavioral Questions
            </li>
            <li
              onClick={() => setActive("roadmap")}
              className={`cursor-pointer px-3 py-2 rounded ${active === "roadmap"
                ? "bg-purple-600/20 text-purple-400"
                : "text-gray-400"
                }`}
            >
              Roadmaps
            </li>
          </ul>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 flex gap-6">

        {/* CENTER CONTENT */}
        <div className="flex-1 overflow-y-auto">

          {/* ROADMAP */}
          {active === "roadmap" && (
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-semibold">Preparation Road Map</h2>
                <span className="text-xs text-gray-400 border border-gray-700 rounded-full px-3 py-1">
                  7-day plan
                </span>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical dashed line */}
                <div
                  className="absolute left-[11px] top-4 bottom-4 w-px"
                  style={{
                    background:
                      "repeating-linear-gradient(to bottom, #e53e3e 0px, #e53e3e 6px, transparent 6px, transparent 12px)",
                    opacity: 0.5,
                  }}
                />

                <div className="space-y-8">
                  {report.preparationPlan.map((item) => (
                    <div key={item.day} className="relative flex gap-6 pl-2">
                      {/* Circle node */}
                      <div className="relative z-10 flex-shrink-0 mt-0.5">
                        <div
                          className="w-6 h-6 rounded-full border-2 border-red-500 bg-[#0b1220]"
                          style={{ boxShadow: "0 0 0 3px rgba(229,62,62,0.15)" }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-3 mb-2">
                          {/* Day badge */}
                          <span className="text-xs font-bold bg-red-600 text-white rounded-full px-3 py-0.5 whitespace-nowrap">
                            Day {item.day}
                          </span>
                          <h3 className="text-base font-semibold text-white">
                            {item.focus}
                          </h3>
                        </div>

                        {/* Task bullets */}
                        <ul className="space-y-1 ml-1">
                          {item.tasks.map((task, ti) => (
                            <li
                              key={ti}
                              className="flex gap-2 text-sm text-gray-400"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TECHNICAL */}
          {active === "technical" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Technical Questions</h2>

              {report.technicalQuestions.map((q, i) => {
                const isOpen = openIndex === `tech-${i}`;

                return (
                  <div
                    key={i}
                    className="bg-[#111827] border border-gray-800 rounded-xl mb-4 overflow-hidden"
                  >
                    {/* HEADER */}
                    <div
                      onClick={() =>
                        setOpenIndex(isOpen ? null : `tech-${i}`)
                      }
                      className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-800/40 transition"
                    >
                      <h3 className="text-lg font-medium">{q.question}</h3>
                      <span className="text-purple-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {/* CONTENT */}
                    {isOpen && (
                      <div className="px-5 pb-6 pt-5 border-t border-gray-800 space-y-5">

                        {/* INTENTION CARD */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            <p className="text-purple-400 text-xs font-semibold tracking-wide bg-purple-500/5 border border-purple-500/20 rounded-lg p-1 backdrop-blur-sm">
                              INTENTION
                            </p>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {q.intention}
                          </p>
                        </div>

                        {/* ANSWER CARD */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            <p className="text-green-400 text-xs font-semibold tracking-wide bg-green-500/5 border border-green-500/20 rounded-lg p-1 backdrop-blur-sm">
                              MODEL ANSWER
                            </p>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {q.answer}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* BEHAVIORAL */}
          {active === "behavioral" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">
                Behavioral Questions
              </h2>

              {report.behavioralQuestions.map((q, i) => {
                const isOpen = openIndex === `beh-${i}`;

                return (
                  <div
                    key={i}
                    className="bg-[#111827] border border-gray-800 rounded-xl mb-4 overflow-hidden"
                  >
                    {/* HEADER */}
                    <div
                      onClick={() =>
                        setOpenIndex(isOpen ? null : `beh-${i}`)
                      }
                      className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-800/40 transition"
                    >
                      <h3 className="text-lg font-medium">{q.question}</h3>
                      <span className="text-purple-400">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {/* CONTENT */}
                    {isOpen && (
                      <div className="px-5 pb-6 pt-5 border-t border-gray-800 space-y-5">

                        {/* INTENTION CARD */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                            <p className="text-purple-400 text-xs p-1 font-semibold tracking-wide border rounded-lg bg-purple-500/5 border-purple-500/20  backdrop-blur-sm">
                              INTENTION
                            </p>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {q.intention}
                          </p>
                        </div>

                        {/* ANSWER CARD */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                            <p className="text-green-400 text-xs font-semibold tracking-wide bg-green-500/5 border border-green-500/20 rounded-lg p-1 backdrop-blur-sm">
                              MODEL ANSWER
                            </p>
                          </div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {q.answer}
                          </p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 space-y-6">

          {/* MATCH SCORE */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6 text-center">
            <h3 className="text-gray-400 text-sm mb-4 font-extrabold">MATCH SCORE</h3>
            <div className="w-28 h-28 mx-auto rounded-full border-4 border-purple-500 flex items-center justify-center text-2xl font-bold">
              {report.matchScore}%
            </div>
            <p className="text-purple-400 mt-3 text-sm">Strong match profile</p>
          </div>

          {/* SKILL GAPS */}
          <div className="bg-[#111827] border border-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-4 font-bold">SKILL GAPS</h3>
            <div className="space-y-3">
              {report.skillGaps.map((gap, i) => (
                <div
                  key={i}
                  className="bg-red-500/10 text-white px-3 py-2 rounded text-sm"
                >
                  {gap.skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Interview;