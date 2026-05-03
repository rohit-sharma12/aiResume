import React, { useState, useEffect } from "react";
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const Interview = () => {
  const [active, setActive] = useState("technical");
  const [openIndex, setOpenIndex] = useState(null);
  const { report, getReportById, loading, getResumePdf } = useInterview()
  const { interviewId } = useParams()

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId)
    }
  }, [interviewId])

  if (loading || !report) {
    return (
      <main className='flex items-center justify-center min-h-screen text-white'>
        <h1 className="text-xl animate-pulse">Loading your interview plan...</h1>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f172a] border-r border-gray-800 p-6 flex flex-col justify-between">

        <div>
          <h2 className="text-lg font-semibold mb-6 text-gray-300">Sections</h2>

          <ul className="space-y-2">

            {[
              { key: "technical", label: "Technical", icon: "ri-code-s-slash-line" },
              { key: "behavioral", label: "Behavioral", icon: "ri-mental-health-line" },
              { key: "roadmap", label: "Roadmap", icon: "ri-road-map-line" }
            ].map(item => (
              <li
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200
                ${active === item.key
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/20"
                    : "text-gray-400 hover:bg-gray-800/40 hover:text-white"
                  }`}
              >
                <i className={`${item.icon} text-lg`}></i>
                {item.label}
              </li>
            ))}

          </ul>
        </div>

        <button
          onClick={() => getResumePdf(interviewId)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition px-4 py-3 rounded-xl text-sm font-semibold shadow-lg"
        >
          <i className="ri-download-2-line"></i>
          Download Resume
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8 flex gap-6">

        {/* CENTER */}
        <div className="flex-1 overflow-y-auto pr-2">

          {/* TECHNICAL */}
          {active === "technical" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <i className="ri-code-s-slash-line text-purple-400"></i>
                Technical Questions
              </h2>

              {report.technicalQuestions.map((q, i) => {
                const isOpen = openIndex === `tech-${i}`;

                return (
                  <div
                    key={i}
                    className="bg-[#111827]/70 backdrop-blur border border-gray-800 rounded-xl mb-4 overflow-hidden transition hover:border-purple-500/30"
                  >
                    <div
                      onClick={() => setOpenIndex(isOpen ? null : `tech-${i}`)}
                      className="flex justify-between items-center p-5 cursor-pointer"
                    >
                      <h3 className="font-medium">{q.question}</h3>
                      <span className="text-purple-400 text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-6 pt-4 border-t border-gray-800 space-y-4">

                        <div>
                          <p className="text-purple-400 text-xs mb-1 font-semibold">INTENTION</p>
                          <p className="text-gray-300 text-sm">{q.intention}</p>
                        </div>

                        <div>
                          <p className="text-green-400 text-xs mb-1 font-semibold">MODEL ANSWER</p>
                          <p className="text-gray-300 text-sm">{q.answer}</p>
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
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <i className="ri-mental-health-line text-purple-400"></i>
                Behavioral Questions
              </h2>

              {report.behavioralQuestions.map((q, i) => {
                const isOpen = openIndex === `beh-${i}`;

                return (
                  <div
                    key={i}
                    className="bg-[#111827]/70 backdrop-blur border border-gray-800 rounded-xl mb-4 overflow-hidden transition hover:border-purple-500/30"
                  >
                    <div
                      onClick={() => setOpenIndex(isOpen ? null : `beh-${i}`)}
                      className="flex justify-between items-center p-5 cursor-pointer"
                    >
                      <h3 className="font-medium">{q.question}</h3>
                      <span className="text-purple-400 text-xl">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>

                    {isOpen && (
                      <div className="px-5 pb-6 pt-4 border-t border-gray-800 space-y-4">

                        <div>
                          <p className="text-purple-400 text-xs mb-1 font-semibold">INTENTION</p>
                          <p className="text-gray-300 text-sm">{q.intention}</p>
                        </div>

                        <div>
                          <p className="text-green-400 text-xs mb-1 font-semibold">MODEL ANSWER</p>
                          <p className="text-gray-300 text-sm">{q.answer}</p>
                        </div>

                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {/* ROADMAP */}
          {active === "roadmap" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <i className="ri-calendar-check-line text-purple-400"></i>
                Preparation Roadmap
              </h2>

              <div className="space-y-6">
                {report.preparationPlan.map(item => (
                  <div
                    key={item.day}
                    className="bg-[#111827]/70 border border-gray-800 rounded-xl p-5 hover:border-purple-500/30 transition"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-purple-600 text-xs px-3 py-1 rounded-full">
                        Day {item.day}
                      </span>
                      <h3 className="font-semibold">{item.focus}</h3>
                    </div>

                    <ul className="space-y-1 text-sm text-gray-400">
                      {item.tasks.map((task, i) => (
                        <li key={i}>• {task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

        {/* RIGHT PANEL */}
        <div className="w-80 space-y-6">

          {/* MATCH SCORE */}
          <div className="bg-[#111827]/70 border border-gray-800 rounded-xl p-6 text-center backdrop-blur">
            <p className="text-gray-400 text-sm mb-3">Match Score</p>
            <div className="text-4xl font-bold text-purple-400">
              {report.matchScore}%
            </div>
            <p className="text-xs text-gray-500 mt-2">Based on your profile & JD</p>
          </div>

          {/* SKILL GAPS */}
          <div className="bg-[#111827]/70 border border-gray-800 rounded-xl p-6 backdrop-blur">
            <h3 className="text-gray-300 mb-4 font-semibold">Skill Gaps</h3>

            <div className="flex flex-wrap gap-2">
              {report.skillGaps.map((gap, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs
                  ${gap.severity === "high"
                      ? "bg-red-500/20 text-red-400"
                      : gap.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Interview;