import { useMemo, useState } from "react";
import "./App.css";

import Header from "./components/layout/Header";
import HeroSection from "./components/sections/HeroSection";
import ServicesSection from "./components/sections/ServicesSection";
import LearningStageSection from "./components/sections/LearningStageSection";
import AchievementsSection from "./components/sections/AchievementsSection";
import ContactSection from "./components/sections/ContactSection";

import PicoCTFModal from "./components/modals/PicoCTFModal";
import LinuxNotesModal from "./components/modals/LinuxNotesModal";
import DigitalLogicModal from "./components/modals/DigitalLogicModal";

import { achievementsData } from "./components/sections/achievements.data";

function App() {
  const [showPicoPage, setShowPicoPage] = useState(false);
  const [showLinuxNotes, setShowLinuxNotes] = useState(false);
  const [showDigitalLogic, setShowDigitalLogic] = useState(false);

  const achievements = useMemo(() => achievementsData, []);

  return (
    <>
      {/* 背景 */}
      <div className="glow-bg" />
      <div className="hero-gradient" aria-hidden="true" />

      <Header />

      <main className="page-main">
        <HeroSection
          onOpenLinux={() => setShowLinuxNotes(true)}
          onOpenPico={() => setShowPicoPage(true)}
          onOpenDigitalLogic={() => setShowDigitalLogic(true)}
        />

        <ServicesSection />

        <LearningStageSection
          onOpenLinux={() => setShowLinuxNotes(true)}
          onOpenPico={() => setShowPicoPage(true)}
          onOpenDigitalLogic={() => setShowDigitalLogic(true)}
        />

        <AchievementsSection achievements={achievements} />

        <ContactSection />
      </main>

      {/* ===== Modals ===== */}
      <PicoCTFModal isOpen={showPicoPage} onClose={() => setShowPicoPage(false)} />
      <LinuxNotesModal isOpen={showLinuxNotes} onClose={() => setShowLinuxNotes(false)} />
      <DigitalLogicModal isOpen={showDigitalLogic} onClose={() => setShowDigitalLogic(false)} />
    </>
  );
}

export default App;