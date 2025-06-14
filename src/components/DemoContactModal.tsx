import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Video,
  Phone,
  Mail,
  Calendar,
  Clock,
  User,
  CheckCircle,
  MessageSquare,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DemoContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContactType = "video" | "call" | "email" | "schedule";

const DemoContactModal = ({ isOpen, onClose }: DemoContactModalProps) => {
  const [selectedType, setSelectedType] = useState<ContactType>("video");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    preferredTime: "",
    timezone: "UTC-8",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const contactTypes = [
    {
      id: "video" as ContactType,
      name: "Demo Video Call",
      icon: Video,
      description: "Live product demonstration with our expert",
      duration: "30 minutes",
      availability: "Available now",
      color: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-500/10 border-blue-500/30",
    },
    {
      id: "call" as ContactType,
      name: "Phone Call",
      icon: Phone,
      description: "Speak directly with our sales team",
      duration: "15 minutes",
      availability: "Within 2 hours",
      color: "from-green-500 to-teal-600",
      bgColor: "bg-green-500/10 border-green-500/30",
    },
    {
      id: "email" as ContactType,
      name: "Send Email",
      icon: Mail,
      description: "Get detailed information via email",
      duration: "Instant",
      availability: "Response in 1 hour",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10 border-orange-500/30",
    },
    {
      id: "schedule" as ContactType,
      name: "Schedule Meeting",
      icon: Calendar,
      description: "Book a convenient time for detailed discussion",
      duration: "45 minutes",
      availability: "Next available slot",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10 border-purple-500/30",
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Auto close after success
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        preferredTime: "",
        timezone: "UTC-8",
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-cyber-blue/20 rounded-xl">
                  <MessageSquare className="h-6 w-6 text-cyber-blue" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Get in Touch
                  </h2>
                  <p className="text-gray-400">
                    Choose how you'd like to connect with us
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-cyber-green" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Request Submitted!
                </h3>
                <p className="text-gray-400 mb-6">
                  We've received your request and will get back to you shortly.
                </p>

                <div className="bg-cyber-blue/10 rounded-lg p-4 border border-cyber-blue/20">
                  <p className="text-cyber-blue font-medium">
                    Expected response time:{" "}
                    {
                      contactTypes.find((t) => t.id === selectedType)
                        ?.availability
                    }
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="p-6">
                {/* Contact Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    How would you like to connect?
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contactTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                          selectedType === type.id
                            ? type.bgColor
                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600",
                        )}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              selectedType === type.id
                                ? "bg-white/20"
                                : "bg-gray-700",
                            )}
                          >
                            <type.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white mb-1">
                              {type.name}
                            </h4>
                            <p className="text-sm text-gray-400 mb-2">
                              {type.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span className="text-gray-500">
                                  {type.duration}
                                </span>
                              </div>
                              <Badge className="bg-cyber-green/20 text-cyber-green border-cyber-green/30 text-xs">
                                {type.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Contact Form */}
                <motion.div
                  key={selectedType}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-6 bg-white/5 border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {contactTypes.find((t) => t.id === selectedType)?.name}{" "}
                      Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Email Address *
                        </Label>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>

                      {(selectedType === "call" ||
                        selectedType === "video") && (
                        <div>
                          <Label className="text-gray-300 mb-2 block">
                            Phone Number *
                          </Label>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                          />
                        </div>
                      )}

                      <div>
                        <Label className="text-gray-300 mb-2 block">
                          Company
                        </Label>
                        <Input
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>

                      {selectedType === "schedule" && (
                        <>
                          <div>
                            <Label className="text-gray-300 mb-2 block">
                              Preferred Time
                            </Label>
                            <Input
                              type="datetime-local"
                              value={formData.preferredTime}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferredTime: e.target.value,
                                })
                              }
                              className="bg-gray-800/50 border-gray-600 text-white"
                            />
                          </div>

                          <div>
                            <Label className="text-gray-300 mb-2 block">
                              Timezone
                            </Label>
                            <select
                              value={formData.timezone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  timezone: e.target.value,
                                })
                              }
                              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-md text-white"
                            >
                              <option value="UTC-8">Pacific Time (PST)</option>
                              <option value="UTC-5">Eastern Time (EST)</option>
                              <option value="UTC+0">GMT</option>
                              <option value="UTC+5:30">India (IST)</option>
                              <option value="UTC+8">Singapore (SGT)</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-4">
                      <Label className="text-gray-300 mb-2 block">
                        {selectedType === "email"
                          ? "Your Message *"
                          : "Additional Notes"}
                      </Label>
                      <Textarea
                        placeholder={
                          selectedType === "email"
                            ? "Tell us about your requirements..."
                            : "Any specific topics you'd like to discuss?"
                        }
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                        rows={4}
                      />
                    </div>

                    {/* Special options for different contact types */}
                    {selectedType === "video" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Video className="h-5 w-5 text-blue-400" />
                          <div>
                            <h4 className="text-white font-medium">
                              Video Demo Features
                            </h4>
                            <p className="text-blue-200/80 text-sm">
                              • Live AI prediction demonstration
                              <br />
                              • Portfolio analysis walkthrough
                              <br />• Q&A with product expert
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {selectedType === "email" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20"
                      >
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-orange-400" />
                          <div>
                            <h4 className="text-white font-medium">
                              You'll Receive
                            </h4>
                            <p className="text-orange-200/80 text-sm">
                              • Detailed product information
                              <br />
                              • Pricing and plan comparisons
                              <br />• Implementation timeline
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <Separator className="my-6" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <Globe className="h-4 w-4" />
                        <span>
                          Response time:{" "}
                          {
                            contactTypes.find((t) => t.id === selectedType)
                              ?.availability
                          }
                        </span>
                      </div>

                      <Button
                        onClick={handleSubmit}
                        disabled={
                          isSubmitting || !formData.name || !formData.email
                        }
                        className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Submit Request</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DemoContactModal;
