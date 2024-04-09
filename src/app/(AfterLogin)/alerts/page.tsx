import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertsData = [
  {
    title: "알림 타입 (AI 피드백 완료 / 답글 알림)",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: "2024.04.09 (수요일)",
  },
  {
    title: "AI 피드백",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: "2024.04.09 (수요일)",
  },
  {
    title: "삼성전자 후기: 게시글에 답글이 달렸습니다.",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias reprehenderit inventore, quos reiciendis delectus excepturi nemo vitae error harum aut deserunt debitis quo eligendi est iste, temporibus illum? Sequi, quisquam.",
    date: "2024.04.09 (수요일)",
  },
];

const Alerts = () => {
  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-4">새로운 알림</h2>
      {AlertsData.map((alert, index) => (
        <article key={index} className="mb-4">
          <Alert>
            <AlertTitle className="mb-2">
              <span>{alert.title}</span>
            </AlertTitle>
            <AlertDescription className="mb-4">{alert.description}</AlertDescription>
            <footer>
              <span className="text-sm text-gray-500">{alert.date}</span>
            </footer>
          </Alert>
        </article>
      ))}
    </section>
  );
};

export default Alerts;
