import type { SemesterRecord } from "@/lib/data";

interface SemesterCardProps {
  semester: SemesterRecord;
}

function gradeColor(grade: string) {
  if (grade === "F") return "text-red-700 bg-red-50 border-red-200";
  if (grade.startsWith("A")) return "text-green-700 bg-green-50 border-green-200";
  if (grade.startsWith("B")) return "text-blue-700 bg-blue-50 border-blue-200";
  if (grade.startsWith("C")) return "text-orange-700 bg-orange-50 border-orange-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
}

export function SemesterCard({ semester }: SemesterCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden print-card">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 sm:px-5 py-3 sm:py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">
            Semester {semester.semesterNum}
          </p>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mt-0.5 sm:mt-1">{semester.semesterName}</h3>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 leading-none">
            {semester.sgpa.toFixed(2)}
          </div>
          <div className="text-[9px] sm:text-[10px] font-semibold text-gray-500 uppercase tracking-wide mt-1">
            SGPA · {semester.totalCredits} Credits
          </div>
        </div>
      </div>

      {/* Courses List */}
      <div className="divide-y divide-gray-100 overflow-x-auto styled-scrollbar">
        <div className="min-w-[400px]">
          <div className="px-3 sm:px-5 py-2 flex items-center bg-white text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
            <div className="flex-1">Course</div>
            <div className="w-12 sm:w-16 text-center">Marks</div>
            <div className="w-12 sm:w-16 text-center">Grade</div>
            <div className="w-12 sm:w-16 text-right">GP</div>
          </div>
          {semester.courses.map((course) => (
            <div key={course.courseCode} className="px-3 sm:px-5 py-2.5 sm:py-3 flex items-center bg-white hover:bg-gray-50/50 transition-colors">
              <div className="flex-1 min-w-0 pr-2 sm:pr-4">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-gray-500">{course.courseCode}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-[9px] sm:text-[10px] bg-gray-100 text-gray-600 px-1 sm:px-1.5 py-0.5 rounded font-medium">{course.creditHours} cr</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{course.courseName}</p>
              </div>
              
              <div className="w-12 sm:w-16 text-center">
                <span className="text-xs sm:text-sm font-semibold tabular-nums text-gray-900">{course.marks}</span>
              </div>
              
              <div className="w-12 sm:w-16 text-center flex justify-center">
                <span className={`inline-flex items-center justify-center w-7 sm:w-8 h-5 sm:h-6 rounded text-[10px] sm:text-xs font-bold border ${gradeColor(course.grade)}`}>
                  {course.grade}
                </span>
              </div>
              
              <div className="w-12 sm:w-16 text-right">
                <span className="text-xs sm:text-sm font-medium tabular-nums text-gray-600">{course.gradePoint.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-200 px-5 py-3 flex justify-between items-center text-[11px] font-medium text-gray-500">
        <div>
          Quality Points: <span className="font-bold text-gray-900">{semester.qualityPoints.toFixed(1)}</span>
        </div>
        <div>
          Total Credits: <span className="font-bold text-gray-900">{semester.totalCredits}</span>
        </div>
      </div>
    </div>
  );
}
