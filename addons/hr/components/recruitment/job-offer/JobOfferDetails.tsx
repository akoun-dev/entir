
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../../src/components/ui/card';
import { JobOffer } from '../../../types/recruitment';

interface JobOfferDetailsProps {
  jobOffer: JobOffer;
}

const JobOfferDetails: React.FC<JobOfferDetailsProps> = ({ jobOffer }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Description du poste</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{jobOffer.job_description}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prérequis</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {jobOffer.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobOfferDetails;
