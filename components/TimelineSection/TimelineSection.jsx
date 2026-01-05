import React, { useMemo } from "react";
import HorizontalScrubTimeline from "./HorizontalScrubTimeline";
import { generateTimelineData } from "./timelineData";

/**
 * TimelineSection - Main section wrapper for the Learning Journey Timeline
 *
 * Replaces the old Learning Journey section with an interactive
 * scroll-driven bubble-cluster timeline.
 */
const TimelineSection = ({ deviceInfo = {} }) => {
  const isMobile = deviceInfo.isMobile || deviceInfo.isFlipPhone;

  // Generate timeline data from folder structure
  const categories = useMemo(() => {
    try {
      return generateTimelineData();
    } catch (error) {
      console.error("Failed to generate timeline data:", error);
      return [];
    }
  }, []);

  // Don't render if no data
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section id="learning-journey">
      <HorizontalScrubTimeline categories={categories} isMobile={isMobile} />
    </section>
  );
};

export default TimelineSection;
