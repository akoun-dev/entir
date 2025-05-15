
import React from 'react';

const ProfilePrintStyles: React.FC = () => {
  return (
    <style>
      {`
        @media print {
          body * {
            visibility: hidden;
          }
          .profile-content, .profile-content * {
            visibility: visible;
          }
          .profile-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
        }
      `}
    </style>
  );
};

export default ProfilePrintStyles;
