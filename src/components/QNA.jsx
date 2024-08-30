
import PropTypes from "prop-types";

const QNA = ({ questionsAndAnswers }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Questions</th>
            <th className="py-2 px-4 border-b">Your Answers</th>
            <th className="py-2 px-4 border-b">Correct Answers</th>
            <th className="py-2 px-4 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {questionsAndAnswers.map((item, i) => (
            <tr
              key={i + 1}
              className="hover:bg-gray-50 odd:bg-white even:bg-gray-100"
            >
              <td className="py-2 px-4 border-b text-center">{i + 1}</td>
              <td className="py-2 px-4 border-b">{item.question}</td>
              <td className="py-2 px-4 border-b">{item.user_answer}</td>
              <td className="py-2 px-4 border-b">{item.correct_answer}</td>
              <td className="py-2 px-4 border-b text-center">{item.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

QNA.propTypes = {
  questionsAndAnswers: PropTypes.array.isRequired,
};

export default QNA;
