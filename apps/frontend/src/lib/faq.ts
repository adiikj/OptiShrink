export const faqItems = [
  {
    question: "Do I need an account to compress a file?",
    answer:
      "No. The public PDF compressor and image optimizer work without signing in. An account is only needed for history, batch runs in the studio, and analytics.",
  },
  {
    question: "What happens to my files after compression?",
    answer:
      "Uploads are processed through Cloudinary for images and pdf.co for PDFs. Temporary copies on our server are deleted as soon as the request finishes. A history entry stores the processed file URL, original name, sizes, and timestamp. Nothing more.",
  },
  {
    question: "Which formats and limits are supported?",
    answer:
      "PDF, JPG, PNG, WebP, and GIF. Each file can be up to 20 MB. A single batch can hold up to 20 images; PDFs are processed one at a time so each compression gets a clean run.",
  },
  {
    question: "What do the three levels actually change?",
    answer:
      "Light keeps more pixels and higher quality. Balanced is the everyday default. Strong caps dimensions and lowers quality for the smallest output. Images only scale down, and PDFs keep their page count at every level.",
  },
  {
    question: "Are my files stored forever?",
    answer:
      "No. Only the compressed result is hosted, by the compression provider. You can remove any history entry from the studio, which deletes our record of it. The provider's copy is subject to their retention policy.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes. Compressing files and keeping a history are free. There is no card, trial timer, or paywalled download.",
  },
];
