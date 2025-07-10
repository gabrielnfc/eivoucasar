import React from 'react';
import { TemplateSection, WeddingTemplate } from '@/types/template';

interface SectionProps {
  section: TemplateSection;
  template: WeddingTemplate;
  isEditable: boolean;
  onFieldUpdate: (fieldId: string, value: string) => void;
}

function TemporarySection({ section }: SectionProps) {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {section.name}
          </h3>
          <p className="text-gray-500 text-sm">
            Seção {section.type} em desenvolvimento
          </p>
          <p className="text-xs text-gray-400 mt-2">
            ID: {section.id}
          </p>
        </div>
      </div>
    </div>
  );
}

// Export das seções implementadas
export { InvitationSection } from './invitation-section';
export { CountdownSection } from './countdown-section';
export { StorySection } from './story-section';
export { GroomsmenSection } from './groomsmen-section';
export { GamificationSection } from './gamification-section';
export { RSVPSection } from './rsvp-section';
export { VenueSection } from './venue-section';
export { DetailsSection } from './details-section';
export { GallerySection } from './gallery-section';
export { TestimonialsSection } from './testimonials-section';
export { FooterSection } from './footer-section';

// Todas as seções foram implementadas! 🎉 