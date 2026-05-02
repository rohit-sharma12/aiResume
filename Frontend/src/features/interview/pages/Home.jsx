import { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
    const { loading, generateReport, reports } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0];

        const data = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile,
        });

        if (data && data._id) {
            navigate(`/interview/${data._id}`);
        }
    };

    if (loading) {
        return (
            <main className="text-white flex items-center justify-center h-screen">
                <h1 className="text-xl animate-pulse">Generating your AI report...</h1>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0b1220] to-[#020617] text-white p-6">

            <div className="max-w-6xl mx-auto">

                {/* HERO */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                        AI Interview{" "}
                        <span className="text-purple-400 italic">Copilot</span>
                    </h1>

                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Generate high-quality interview reports, identify skill gaps,
                        and prepare like a top 1% candidate.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm rounded-lg p-4 mb-8 text-center"> ⚠️ To generate a <span className="font-semibold">personalized report</span>, please upload your resume OR provide a detailed self-description. </div>
                </div>

                {/* MAIN CARD */}
                <div className="bg-[#0f172a]/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">

                    {/* RESUME */}
                    <div className="mb-8">
                        <p className="text-sm text-gray-400 mb-3">📄 Upload Resume</p>

                        <label className="border-2 border-dashed border-gray-700 rounded-xl h-36 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500 transition cursor-pointer">
                            <input
                                ref={resumeInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                            />
                            <p>Click or drag your resume</p>
                            <p className="text-xs mt-1">PDF only • Max 5MB</p>
                        </label>
                    </div>

                    {/* INPUT GRID */}
                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-[#020617]/60 border border-gray-800 rounded-xl p-5">
                            <p className="text-sm text-gray-400 mb-2">👤 About You</p>

                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                rows="5"
                                placeholder="Your skills, experience, projects..."
                                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none resize-none"
                            />
                        </div>

                        <div className="bg-[#020617]/60 border border-gray-800 rounded-xl p-5">
                            <p className="text-sm text-gray-400 mb-2">💼 Job Description</p>

                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                rows="5"
                                placeholder="Paste job description here..."
                                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none resize-none"
                            />
                        </div>

                    </div>

                    {/* CTA */}
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={handleGenerateReport}
                            className="px-10 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:scale-105 hover:shadow-lg transition-all font-semibold"
                        >
                            Generate AI Report ✨
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-4">
                        Takes ~30–45 seconds • AI-powered analysis
                    </p>
                </div>

                {/* REPORTS */}
                {reports?.length > 0 && (
                    <section className="mt-12">

                        <h2 className="text-xl font-semibold mb-6 text-gray-300">
                            Your Reports
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            {reports.map((report) => (
                                <div
                                    key={report._id}
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    className="bg-[#0f172a]/60 border border-gray-800 rounded-xl p-5 cursor-pointer hover:border-purple-500 hover:shadow-lg transition"
                                >
                                    <h3 className="font-semibold text-lg">
                                        {report.title || "Untitled Role"}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(report.createdAt).toLocaleDateString()}
                                    </p>

                                    <div className="mt-3">
                                        <span className={`text-sm font-medium px-3 py-1 rounded-full 
                                            ${report.matchScore >= 80
                                                ? "bg-green-500/20 text-green-400"
                                                : report.matchScore >= 60
                                                    ? "bg-yellow-500/20 text-yellow-400"
                                                    : "bg-red-500/20 text-red-400"
                                            }`}>
                                            {report.matchScore || 0}%
                                        </span>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </section>
                )}

            </div>
        </div>
    );
};

export default Home;