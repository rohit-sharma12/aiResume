import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../../auth/services/interview.api";
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context


    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)

        try {
            const response = await generateInterviewReport({
                jobDescription,
                selfDescription,
                resumeFile
            })

            if (response?.interviewReport) {
                setReport(response.interviewReport)
                return response.interviewReport
            }

            return null

        } catch (error) {
            console.log(error)
            return null
        } finally {
            setLoading(false)
        }
    }



    const getReportById = async (interviewId) => {
        if (!interviewId) return null

        setLoading(true)

        try {
            const response = await getInterviewReportById(interviewId)

            if (response?.interviewReport) {
                setReport(response.interviewReport)
                return response.interviewReport
            }

            return null

        } catch (error) {
            console.log(error)
            return null
        } finally {
            setLoading(false)
        }
    }
    const getReports = async () => {
        setLoading(true)

        try {
            const response = await getAllInterviewReports()

            if (response?.interviewReports) {
                setReports(response.interviewReports)
                return response.interviewReports
            }

            return []

        } catch (error) {
            console.log(error)
            return []
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId])

    return { loading, report, reports, getReportById, getReports, generateReport }
}