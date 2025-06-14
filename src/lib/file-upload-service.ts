export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  success: boolean;
  fileUrl?: string;
  fileName?: string;
  error?: string;
}

export interface FileValidation {
  isValid: boolean;
  error?: string;
}

class FileUploadService {
  private maxFileSize = 10 * 1024 * 1024; // 10MB
  private allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];

  validateFile(file: File): FileValidation {
    // Check file size
    if (file.size > this.maxFileSize) {
      return {
        isValid: false,
        error: "File size must be less than 10MB",
      };
    }

    // Check file type
    if (!this.allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: "Only JPEG, PNG, and PDF files are allowed",
      };
    }

    return { isValid: true };
  }

  async uploadFile(
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<UploadResult> {
    return new Promise((resolve) => {
      // Validate file first
      const validation = this.validateFile(file);
      if (!validation.isValid) {
        resolve({
          success: false,
          error: validation.error,
        });
        return;
      }

      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) progress = 100;

        if (onProgress) {
          onProgress({
            loaded: (progress / 100) * file.size,
            total: file.size,
            percentage: Math.round(progress),
          });
        }

        if (progress >= 100) {
          clearInterval(interval);

          // Simulate successful upload
          setTimeout(() => {
            resolve({
              success: true,
              fileUrl: `https://docs.stockvision.com/uploads/${file.name}`,
              fileName: file.name,
            });
          }, 500);
        }
      }, 200);
    });
  }

  async downloadFile(
    fileName: string,
    fileType: "pan" | "aadhar" | "other",
  ): Promise<void> {
    // Simulate file download
    const link = document.createElement("a");

    // Generate demo file URL based on type
    const fileUrl = this.generateDemoFileUrl(fileName, fileType);

    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show download notification
    console.log(`Downloaded ${fileName}`);
  }

  private generateDemoFileUrl(
    fileName: string,
    fileType: "pan" | "aadhar" | "other",
  ): string {
    // In a real application, this would be the actual file URL
    // For demo purposes, we'll create a blob with placeholder content
    const content = this.generateDemoFileContent(fileType);
    const blob = new Blob([content], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  }

  private generateDemoFileContent(
    fileType: "pan" | "aadhar" | "other",
  ): string {
    switch (fileType) {
      case "pan":
        return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 96
>>
stream
BT
/F1 12 Tf
72 720 Td
(PAN Card Document - Demo File) Tj
0 -20 Td
(This is a demo PAN card for StockVision) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000189 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
335
%%EOF`;

      case "aadhar":
        return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 102
>>
stream
BT
/F1 12 Tf
72 720 Td
(Aadhar Card Document - Demo File) Tj
0 -20 Td
(This is a demo Aadhar card for StockVision) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000189 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
341
%%EOF`;

      default:
        return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 98
>>
stream
BT
/F1 12 Tf
72 720 Td
(Document - Demo File) Tj
0 -20 Td
(This is a demo document for StockVision) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000189 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
337
%%EOF`;
    }
  }

  getFileTypeIcon(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "📄";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📎";
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

export const fileUploadService = new FileUploadService();
export default fileUploadService;
