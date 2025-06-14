import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import GlobalAnimatedBackground from "@/components/GlobalAnimatedBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { fileUploadService, UploadProgress } from "@/lib/file-upload-service";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Settings,
  Shield,
  CreditCard,
  FileText,
  Bell,
  Eye,
  EyeOff,
  Edit3,
  Check,
  X,
  Download,
  Upload,
  Camera,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  TrendingUp,
  BarChart3,
  Award,
  Copy,
  CheckCircle,
  AlertTriangle,
  Clock,
  Verified,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPan, setShowPan] = useState(false);
  const [showAadhar, setShowAadhar] = useState(false);
  const [copied, setCopied] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<
    Array<{
      name: string;
      url: string;
      type: string;
      uploadDate: string;
    }>
  >([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Simulated user profile data (in real app, this would come from API)
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    address: "123 Trading Street, Finance City, NY 10001",

    // Trading Account Details
    clientId: "SV" + Date.now().toString().slice(-8),
    dpId: "DP" + Math.random().toString(36).substring(7).toUpperCase(),
    tradingAccountStatus: "Active",
    accountType: "Individual",
    riskProfile: "Moderate",
    tradingExperience: "2-5 years",

    // KYC Details
    panNumber: "ABCDE1234F",
    aadharNumber: "1234-5678-9012",
    kycStatus: "Verified",
    kycDate: "2024-01-15",

    // Bank Details
    bankName: "Chase Bank",
    accountNumber: "****1234",
    ifscCode: "CHAS0001",

    // Broker Details
    brokerageRate: "0.05%",
    marginLimit: "$50,000",
    portfolioValue: "$125,432.50",
    availableMargin: "$23,567.80",
  });

  const [tempData, setTempData] = useState(profileData);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setIsUploading(true);
    setUploadError("");
    setUploadProgress(0);

    try {
      const result = await fileUploadService.uploadFile(
        file,
        (progress: UploadProgress) => {
          setUploadProgress(progress.percentage);
        },
      );

      if (result.success && result.fileUrl && result.fileName) {
        const newFile = {
          name: result.fileName,
          url: result.fileUrl,
          type: file.type,
          uploadDate: new Date().toLocaleDateString(),
        };

        setUploadedFiles((prev) => [newFile, ...prev]);
        toast({
          title: "Upload Successful",
          description: `${result.fileName} has been uploaded successfully.`,
        });
      } else {
        setUploadError(result.error || "Upload failed");
        toast({
          title: "Upload Failed",
          description: result.error || "Failed to upload file",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setUploadError(errorMessage);
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleFileUpload(event.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDownload = async (
    fileName: string,
    type: "pan" | "aadhar" | "other",
  ) => {
    try {
      await fileUploadService.downloadFile(fileName, type);
      toast({
        title: "Download Started",
        description: `${fileName} download has started.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "verified":
        return "text-cyber-green bg-cyber-green/20 border-cyber-green/30";
      case "pending":
        return "text-cyber-yellow bg-cyber-yellow/20 border-cyber-yellow/30";
      case "inactive":
      case "rejected":
        return "text-cyber-red bg-cyber-red/20 border-cyber-red/30";
      default:
        return "text-white/70 bg-white/10 border-white/20";
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <GlobalAnimatedBackground variant="minimal">
      <Navigation />

      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto">
                {profileData.firstName.charAt(0)}
                {profileData.lastName.charAt(0)}
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cyber-blue hover:bg-cyber-blue/80 p-0"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-white/60">
              <div className="flex items-center space-x-1">
                <span className="text-sm">Client ID:</span>
                <span className="font-mono font-medium text-cyber-blue">
                  {profileData.clientId}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-1 h-auto"
                  onClick={() =>
                    copyToClipboard(profileData.clientId, "clientId")
                  }
                >
                  {copied === "clientId" ? (
                    <CheckCircle className="h-3 w-3 text-cyber-green" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <Badge
                className={cn(
                  "text-xs",
                  getStatusColor(profileData.accountType),
                )}
              >
                {profileData.accountType} Account
              </Badge>
            </div>
          </motion.div>

          {/* Profile Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-md border border-cyber-blue/20 rounded-2xl p-1 mb-8">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-cyber-blue data-[state=active]:text-white text-white/70 rounded-xl transition-all"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className="data-[state=active]:bg-cyber-green data-[state=active]:text-white text-white/70 rounded-xl transition-all"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trading
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-cyber-purple data-[state=active]:text-white text-white/70 rounded-xl transition-all"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-cyber-yellow data-[state=active]:text-black text-white/70 rounded-xl transition-all"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-blue/20">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-white">
                        Personal Information
                      </CardTitle>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          isEditing ? handleCancel() : setIsEditing(true)
                        }
                        className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                      >
                        {isEditing ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Edit3 className="h-4 w-4" />
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white/80">First Name</Label>
                          {isEditing ? (
                            <Input
                              value={tempData.firstName}
                              onChange={(e) =>
                                setTempData({
                                  ...tempData,
                                  firstName: e.target.value,
                                })
                              }
                              className="bg-cyber-dark border-cyber-blue/30 text-white"
                            />
                          ) : (
                            <p className="text-white font-medium">
                              {profileData.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="text-white/80">Last Name</Label>
                          {isEditing ? (
                            <Input
                              value={tempData.lastName}
                              onChange={(e) =>
                                setTempData({
                                  ...tempData,
                                  lastName: e.target.value,
                                })
                              }
                              className="bg-cyber-dark border-cyber-blue/30 text-white"
                            />
                          ) : (
                            <p className="text-white font-medium">
                              {profileData.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-white/80 flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span>Email</span>
                        </Label>
                        <p className="text-white font-medium">
                          {profileData.email}
                        </p>
                      </div>

                      <div>
                        <Label className="text-white/80 flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Phone</span>
                        </Label>
                        {isEditing ? (
                          <Input
                            value={tempData.phone}
                            onChange={(e) =>
                              setTempData({
                                ...tempData,
                                phone: e.target.value,
                              })
                            }
                            className="bg-cyber-dark border-cyber-blue/30 text-white"
                          />
                        ) : (
                          <p className="text-white font-medium">
                            {profileData.phone}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-white/80 flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Date of Birth</span>
                        </Label>
                        <p className="text-white font-medium">
                          {new Date(
                            profileData.dateOfBirth,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <Label className="text-white/80 flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>Address</span>
                        </Label>
                        {isEditing ? (
                          <Input
                            value={tempData.address}
                            onChange={(e) =>
                              setTempData({
                                ...tempData,
                                address: e.target.value,
                              })
                            }
                            className="bg-cyber-dark border-cyber-blue/30 text-white"
                          />
                        ) : (
                          <p className="text-white font-medium">
                            {profileData.address}
                          </p>
                        )}
                      </div>

                      {isEditing && (
                        <div className="flex space-x-2 pt-4">
                          <Button
                            onClick={handleSave}
                            className="bg-cyber-green hover:bg-cyber-green/80 text-white"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Account Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-green/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Award className="h-5 w-5 text-cyber-green" />
                        <span>Account Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-cyber-blue/10 p-3 rounded-lg">
                          <div className="text-cyber-blue/80 text-sm">
                            Portfolio Value
                          </div>
                          <div className="text-white font-bold text-lg">
                            {profileData.portfolioValue}
                          </div>
                        </div>
                        <div className="bg-cyber-green/10 p-3 rounded-lg">
                          <div className="text-cyber-green/80 text-sm">
                            Available Margin
                          </div>
                          <div className="text-white font-bold text-lg">
                            {profileData.availableMargin}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/60">Risk Profile:</span>
                          <Badge className="bg-cyber-yellow/20 text-cyber-yellow">
                            {profileData.riskProfile}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">
                            Trading Experience:
                          </span>
                          <span className="text-white font-medium">
                            {profileData.tradingExperience}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Brokerage Rate:</span>
                          <span className="text-white font-medium">
                            {profileData.brokerageRate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Margin Limit:</span>
                          <span className="text-white font-medium">
                            {profileData.marginLimit}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Trading Tab */}
            <TabsContent value="trading" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trading Account Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-green/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <BarChart3 className="h-5 w-5 text-cyber-green" />
                        <span>Trading Account</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">Client ID:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono">
                              {profileData.clientId}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 h-auto"
                              onClick={() =>
                                copyToClipboard(
                                  profileData.clientId,
                                  "clientId2",
                                )
                              }
                            >
                              {copied === "clientId2" ? (
                                <CheckCircle className="h-3 w-3 text-cyber-green" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-white/60">DP ID:</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-mono">
                              {profileData.dpId}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 h-auto"
                              onClick={() =>
                                copyToClipboard(profileData.dpId, "dpId")
                              }
                            >
                              {copied === "dpId" ? (
                                <CheckCircle className="h-3 w-3 text-cyber-green" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-white/60">Account Status:</span>
                          <Badge
                            className={cn(
                              "text-xs",
                              getStatusColor(profileData.tradingAccountStatus),
                            )}
                          >
                            <Verified className="h-3 w-3 mr-1" />
                            {profileData.tradingAccountStatus}
                          </Badge>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-white/60">Account Type:</span>
                          <span className="text-white font-medium">
                            {profileData.accountType}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-semibold mb-3">
                          Quick Actions
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            className="bg-cyber-green hover:bg-cyber-green/80 text-white"
                          >
                            <Download className="h-3 w-3 mr-2" />
                            Download Statement
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                          >
                            <BarChart3 className="h-3 w-3 mr-2" />
                            View Reports
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Bank Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-cyber-dark/50 border-cyber-purple/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-cyber-purple" />
                        <span>Bank Details</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/60">Bank Name:</span>
                          <span className="text-white font-medium">
                            {profileData.bankName}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-white/60">Account Number:</span>
                          <span className="text-white font-mono">
                            {profileData.accountNumber}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-white/60">IFSC Code:</span>
                          <span className="text-white font-mono">
                            {profileData.ifscCode}
                          </span>
                        </div>
                      </div>

                      <div className="bg-cyber-yellow/10 border border-cyber-yellow/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-cyber-yellow" />
                          <span className="text-cyber-yellow font-semibold text-sm">
                            Important
                          </span>
                        </div>
                        <p className="text-white/80 text-xs">
                          Bank account changes require verification and may take
                          2-3 business days to process.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* KYC Documents Section - Expanded */}
                <div className="lg:col-span-2">
                  <Card className="bg-cyber-dark/50 border-cyber-purple/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-cyber-purple" />
                        <span>KYC Documents</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Document Details - Expanded View */}
                      <div className="space-y-4">
                        {/* PAN Details */}
                        <div className="bg-cyber-blue/5 border border-cyber-blue/20 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-cyber-blue font-semibold">
                              PAN Card Details
                            </h4>
                            <Badge
                              className={cn(
                                "text-xs",
                                getStatusColor("verified"),
                              )}
                            >
                              <Verified className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">PAN Number:</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-mono text-sm">
                                  {showPan
                                    ? profileData.panNumber
                                    : "ABCDE****F"}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-auto"
                                  onClick={() => setShowPan(!showPan)}
                                >
                                  {showPan ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">
                                Name on PAN:
                              </span>
                              <span className="text-white text-sm">
                                {profileData.firstName} {profileData.lastName}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">
                                Date of Birth:
                              </span>
                              <span className="text-white text-sm">
                                {new Date(
                                  profileData.dateOfBirth,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-cyber-blue/20">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                              onClick={() =>
                                handleDownload("PAN_Card.pdf", "pan")
                              }
                            >
                              <Download className="h-3 w-3 mr-2" />
                              Download PAN Card
                            </Button>
                          </div>
                        </div>

                        {/* Aadhar Details */}
                        <div className="bg-cyber-green/5 border border-cyber-green/20 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-cyber-green font-semibold">
                              Aadhar Card Details
                            </h4>
                            <Badge
                              className={cn(
                                "text-xs",
                                getStatusColor("verified"),
                              )}
                            >
                              <Verified className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">
                                Aadhar Number:
                              </span>
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-mono text-sm">
                                  {showAadhar
                                    ? profileData.aadharNumber
                                    : "****-****-9012"}
                                </span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-1 h-auto"
                                  onClick={() => setShowAadhar(!showAadhar)}
                                >
                                  {showAadhar ? (
                                    <EyeOff className="h-3 w-3" />
                                  ) : (
                                    <Eye className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-white/60">Address:</span>
                              <span className="text-white text-sm text-right max-w-xs">
                                {profileData.address}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-cyber-green/20">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                              onClick={() =>
                                handleDownload("Aadhar_Card.pdf", "aadhar")
                              }
                            >
                              <Download className="h-3 w-3 mr-2" />
                              Download Aadhar Card
                            </Button>
                          </div>
                        </div>

                        {/* KYC Status Summary */}
                        <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-cyber-green" />
                            <span className="text-cyber-green font-semibold">
                              KYC Completed
                            </span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="text-white/80">
                              Your KYC verification is complete. You can now
                              access all trading features without any
                              restrictions.
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-white/60">
                                Verified Date:
                              </span>
                              <span className="text-cyber-green font-medium">
                                {new Date(
                                  profileData.kycDate,
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Document Upload Section - Enhanced */}
                <div className="space-y-6">
                  <Card className="bg-cyber-dark/50 border-cyber-yellow/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center space-x-2">
                        <Upload className="h-5 w-5 text-cyber-yellow" />
                        <span>Document Upload</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* File Upload Area */}
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 cursor-pointer",
                          dragActive
                            ? "border-cyber-blue bg-cyber-blue/10"
                            : "border-cyber-purple/30 hover:border-cyber-purple/50 hover:bg-cyber-purple/5",
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <div className="space-y-3">
                          <div className="p-3 bg-cyber-purple/20 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                            <Upload className="h-6 w-6 text-cyber-purple" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {dragActive
                                ? "Drop files here"
                                : "Click to upload or drag and drop"}
                            </p>
                            <p className="text-white/60 text-sm mt-1">
                              PDF, JPG, PNG up to 10MB
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                      />

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Uploading...</span>
                            <span className="text-cyber-blue">
                              {uploadProgress}%
                            </span>
                          </div>
                          <Progress value={uploadProgress} className="h-2" />
                        </div>
                      )}

                      {/* Upload Error */}
                      {uploadError && (
                        <Alert className="border-cyber-red/30 bg-cyber-red/10">
                          <AlertTriangle className="h-4 w-4 text-cyber-red" />
                          <AlertDescription className="text-cyber-red">
                            {uploadError}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  {/* Uploaded Files */}
                  {uploadedFiles.length > 0 && (
                    <Card className="bg-cyber-dark/50 border-cyber-green/20">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-cyber-green" />
                          <span>Uploaded Files</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-3 bg-cyber-green/5 border border-cyber-green/20 rounded-lg"
                            >
                              <div className="text-2xl">
                                {fileUploadService.getFileTypeIcon(file.name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">
                                  {file.name}
                                </p>
                                <p className="text-white/60 text-xs">
                                  Uploaded on {file.uploadDate}
                                </p>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-2"
                                >
                                  <Eye className="h-3 w-3 text-cyber-blue" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="p-2"
                                >
                                  <Download className="h-3 w-3 text-cyber-green" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-cyber-dark/50 border-cyber-yellow/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-cyber-yellow" />
                      <span>Account Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">
                            Two-Factor Authentication
                          </div>
                          <div className="text-white/60 text-sm">
                            Add an extra layer of security
                          </div>
                        </div>
                        <Badge className="bg-cyber-green/20 text-cyber-green">
                          Enabled
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">
                            Email Notifications
                          </div>
                          <div className="text-white/60 text-sm">
                            Receive trade confirmations via email
                          </div>
                        </div>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue">
                          On
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">
                            SMS Alerts
                          </div>
                          <div className="text-white/60 text-sm">
                            Get price alerts via SMS
                          </div>
                        </div>
                        <Badge className="bg-cyber-blue/20 text-cyber-blue">
                          On
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-cyber-dark/50 border-cyber-red/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-cyber-red" />
                      <span>Security</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full border-cyber-yellow/30 text-cyber-yellow hover:bg-cyber-yellow/10"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                    >
                      Manage Sessions
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-cyber-red/30 text-cyber-red hover:bg-cyber-red/10"
                    >
                      Deactivate Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </GlobalAnimatedBackground>
  );
};

export default Profile;
