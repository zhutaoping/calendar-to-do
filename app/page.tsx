import BlackBoard from "./components/BlackBoard";
import { DayProvider } from "./store/DayContext";

export default function Home() {
  return (
    <DayProvider>
      <main>
        <BlackBoard />
      </main>
    </DayProvider>
  );
}
