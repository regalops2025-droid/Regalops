import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { 
  LogOut, ExternalLink, Trash2, Mail, Phone, Building2, Calendar, User, Inbox, RefreshCw, 
  Plus, Image as ImageIcon, Pencil, Menu, X, Layers, Cpu, Briefcase, MapPin, BookOpen, 
  Compass, Bell, MessageSquare, Copy, Check, Search, LayoutGrid, List, Send, Filter, 
  FileText, Sun, Moon, Download, CheckCircle2, Clock, Sparkles, Share2, Users, 
  ArrowUpRight, SlidersHorizontal, AlertCircle, Eye, ChevronRight, ChevronDown, LayoutDashboard,
  Zap, Activity, ShieldCheck, ArrowRight, TrendingUp
} from "lucide-react";
import { ImageUploadField } from "@/components/admin/image-upload-field";

// Custom official SVG for WhatsApp
const WhatsAppIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Regal OPs" },
      {
        name: "description",
        content: "Admin portal to view enquiries and manage solutions, technologies, services, clients, careers & blogs.",
      },
    ],
  }),
  component: AdminDashboard,
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-bold text-rose-400 mb-2">Admin Portal</h2>
        <p className="text-sm text-zinc-400 mb-4">{error?.message || "Session expired or access error."}</p>
        <a href="/login" className="px-4 py-2 bg-[#555d25] text-white rounded-xl text-xs font-semibold">
          Go to Sign In
        </a>
      </div>
    </div>
  ),
});

function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [activeTab, setActiveTab] = useState<"dashboard" | "enquiries" | "solutions" | "technologies" | "services" | "clients" | "careers" | "blogs" | "applications">("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Theme state (Executive Dark / Crisp Modern Light)
  const [adminTheme, setAdminTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("regalops_admin_theme") as "dark" | "light") || "light";
    }
    return "light";
  });

  const toggleAdminTheme = () => {
    const next = adminTheme === "dark" ? "light" : "dark";
    setAdminTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("regalops_admin_theme", next);
    }
  };


  // Notifications dropdown open state
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Enquiries State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const [enquiriesError, setEnquiriesError] = useState("");
  const [deleteEnquiryStatus, setDeleteEnquiryStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);
  const [enquirySearchQuery, setEnquirySearchQuery] = useState("");
  const [enquiryServiceFilter, setEnquiryServiceFilter] = useState("all");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<"all" | "new" | "contacted">("all");
  const [enquiryViewMode, setEnquiryViewMode] = useState<"cards" | "table">("cards");
  const [copiedEnquiryId, setCopiedEnquiryId] = useState<number | null>(null);

  // Lead CRM statuses stored in local storage
  const [leadStatuses, setLeadStatuses] = useState<Record<number, "new" | "contacted" | "in_discussion" | "closed">>(() => {
    try {
      if (typeof window !== "undefined") {
        return JSON.parse(localStorage.getItem("regalops_lead_statuses") || "{}");
      }
      return {};
    } catch {
      return {};
    }
  });

  const updateLeadStatus = (id: number, status: "new" | "contacted" | "in_discussion" | "closed") => {
    const next = { ...leadStatuses, [id]: status };
    setLeadStatuses(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("regalops_lead_statuses", JSON.stringify(next));
    }
  };

  const handleCopyEnquiry = (item: any) => {
    const cleanName = [item.first_name, item.last_name]
      .filter(Boolean)
      .map((s: string) => s.trim())
      .filter((s: string) => s && s !== "-")
      .join(" ");
    const location = [item.city, item.state, item.country, item.zip_code].filter(Boolean).join(", ");
    const summary = `Name: ${cleanName || "N/A"}\nEmail: ${item.email || "N/A"}\nPhone: ${item.mobile || "N/A"}\nService: ${item.service || "N/A"}\nLocation: ${location || "N/A"}\nStatus: ${leadStatuses[item.id] || "new"}\nMessage: ${item.comments || "N/A"}`;
    navigator.clipboard.writeText(summary);
    setCopiedEnquiryId(item.id);
    setTimeout(() => setCopiedEnquiryId(null), 2000);
  };

  const exportEnquiriesCSV = () => {
    if (!enquiries.length) return;
    const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "Service", "City", "State", "Country", "Date", "Status", "Message"];
    const rows = enquiries.map((e) => [
      e.id,
      `"${(e.first_name || "").replace(/"/g, '""')}"`,
      `"${(e.last_name || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.mobile || "").replace(/"/g, '""')}"`,
      `"${(e.service || "").replace(/"/g, '""')}"`,
      `"${(e.city || "").replace(/"/g, '""')}"`,
      `"${(e.state || "").replace(/"/g, '""')}"`,
      `"${(e.country || "").replace(/"/g, '""')}"`,
      `"${e.created_at ? new Date(e.created_at).toISOString() : ""}"`,
      `"${leadStatuses[e.id] || "new"}"`,
      `"${(e.comments || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `regalops_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getWhatsAppLink = (phone: string, name: string) => {
    if (!phone) return null;
    const cleanNumber = phone.replace(/[^\d]/g, "");
    if (!cleanNumber) return null;
    const message = encodeURIComponent(`Hello ${name || ""}, thank you for reaching out to Regal OPs. We received your inquiry and would be glad to assist you!`);
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  // Solutions State
  const [solutions, setSolutions] = useState<any[]>([]);
  const [solutionsLoading, setSolutionsLoading] = useState(true);
  const [solutionsError, setSolutionsError] = useState("");
  const [deleteSolutionStatus, setDeleteSolutionStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for solutions
  const [editingSolId, setEditingSolId] = useState<number | null>(null);

  // Form State for new/editing solution
  const [solName, setSolName] = useState("");
  const [solImage, setSolImage] = useState("");
  const [solDesc, setSolDesc] = useState("");
  const [solCapabilities, setSolCapabilities] = useState("");
  const [solMethodology, setSolMethodology] = useState("");
  const [solDeliverables, setSolDeliverables] = useState("");
  const [solTechnologies, setSolTechnologies] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Technologies State
  const [techList, setTechList] = useState<any[]>([]);
  const [techLoading, setTechLoading] = useState(true);
  const [techError, setTechError] = useState("");
  const [deleteTechStatus, setDeleteTechStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for technologies
  const [editingTechId, setEditingTechId] = useState<number | null>(null);

  // Form State for new/editing technology
  const [techName, setTechName] = useState("");
  const [techCategory, setTechCategory] = useState("ENTERPRISE WEB & FRONTEND");
  const [techStatusBadge, setTechStatusBadge] = useState("PRODUCTION READY");
  const [techBrands, setTechBrands] = useState("");
  const [techDesc, setTechDesc] = useState("");
  const [techKeywords, setTechKeywords] = useState("");
  const [techHowToWork, setTechHowToWork] = useState("");
  const [techFormLoading, setTechFormLoading] = useState(false);
  const [techFormSuccess, setTechFormSuccess] = useState(false);
  const [techFormError, setTechFormError] = useState("");

  // Services State
  const [serviceList, setServiceList] = useState<any[]>([]);
  const [serviceLoading, setServiceLoading] = useState(true);
  const [serviceError, setServiceError] = useState("");
  const [deleteServiceStatus, setDeleteServiceStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for services
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);

  // Form State for new/editing service
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [serviceIcon, setServiceIcon] = useState("tech-consulting");
  const [serviceLink, setServiceLink] = useState("/solutions");
  const [serviceFormLoading, setServiceFormLoading] = useState(false);
  const [serviceFormSuccess, setServiceFormSuccess] = useState(false);
  const [serviceFormError, setServiceFormError] = useState("");

  // Clients State
  const [clientList, setClientList] = useState<any[]>([]);
  const [clientLoading, setClientLoading] = useState(true);
  const [clientError, setClientError] = useState("");
  const [deleteClientStatus, setDeleteClientStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for clients
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  // Form State for new/editing client
  const [clientName, setClientName] = useState("");
  const [clientSector, setClientSector] = useState("Banking");
  const [clientImage, setClientImage] = useState("");
  const [clientDesc, setClientDesc] = useState("");
  const [clientFormLoading, setClientFormLoading] = useState(false);
  const [clientFormSuccess, setClientFormSuccess] = useState(false);
  const [clientFormError, setClientFormError] = useState("");

  // Careers/Jobs State
  const [jobList, setJobList] = useState<any[]>([]);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobError, setJobError] = useState("");
  const [deleteJobStatus, setDeleteJobStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for careers
  const [editingJobId, setEditingJobId] = useState<number | null>(null);

  // Form State for new/editing job
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [jobDescription, setJobDescription] = useState("");
  const [jobFormLoading, setJobFormLoading] = useState(false);
  const [jobFormSuccess, setJobFormSuccess] = useState(false);
  const [jobFormError, setJobFormError] = useState("");

  // Blogs State
  const [blogList, setBlogList] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogError, setBlogError] = useState("");
  const [deleteBlogStatus, setDeleteBlogStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Applications State
  const [applications, setApplications] = useState<any[]>([]);
  const [applicationsLoading, setApplicationsLoading] = useState(true);
  const [applicationsError, setApplicationsError] = useState("");
  const [deleteApplicationStatus, setDeleteApplicationStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for blogs
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);

  // Form State for new/editing blog
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTag, setBlogTag] = useState("Architecture");
  const [blogImage, setBlogImage] = useState("");
  const [blogDesc, setBlogDesc] = useState("");
  const [blogSections, setBlogSections] = useState<any[]>([{ heading: "", image: "", story: "" }]);
  const [blogFormLoading, setBlogFormLoading] = useState(false);
  const [blogFormSuccess, setBlogFormSuccess] = useState(false);
  const [blogFormError, setBlogFormError] = useState("");
  
  // Industries State
  const [industriesList, setIndustriesList] = useState<any[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(true);
  const [industriesError, setIndustriesError] = useState("");
  const [deleteIndustryStatus, setDeleteIndustryStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);
  
  // Editing state for industries
  const [editingIndustryId, setEditingIndustryId] = useState<number | null>(null);
  const [industryName, setIndustryName] = useState("");
  const [industryFormLoading, setIndustryFormLoading] = useState(false);
  const [industryFormSuccess, setIndustryFormSuccess] = useState(false);
  const [industryFormError, setIndustryFormError] = useState("");
  const [clientSubTab, setClientSubTab] = useState<"cases" | "industries">("cases");

  // Dropdown preset popover states & refs for Technologies and Services forms
  const [showTechCategoryPresets, setShowTechCategoryPresets] = useState(false);
  const [showTechStatusPresets, setShowTechStatusPresets] = useState(false);
  const [showTechBrandsPresets, setShowTechBrandsPresets] = useState(false);
  const [showServiceIconPresets, setShowServiceIconPresets] = useState(false);

  const techCategoryRef = useRef<HTMLDivElement>(null);
  const techStatusRef = useRef<HTMLDivElement>(null);
  const techBrandsRef = useRef<HTMLDivElement>(null);
  const serviceIconRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (techCategoryRef.current && !techCategoryRef.current.contains(e.target as Node)) {
        setShowTechCategoryPresets(false);
      }
      if (techStatusRef.current && !techStatusRef.current.contains(e.target as Node)) {
        setShowTechStatusPresets(false);
      }
      if (techBrandsRef.current && !techBrandsRef.current.contains(e.target as Node)) {
        setShowTechBrandsPresets(false);
      }
      if (serviceIconRef.current && !serviceIconRef.current.contains(e.target as Node)) {
        setShowServiceIconPresets(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const secureFetch = (url: string, options: any = {}) => {
    return fetch(url, {
      ...options,
      credentials: "include"
    });
  };

  // Authentication check
  useEffect(() => {
    secureFetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setAdmin(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
      })
      .catch(() => {
        localStorage.removeItem("user");
        navigate({ to: "/login" });
      });
  }, [navigate]);

  // Fetch enquiries
  const fetchEnquiries = async () => {
    setEnquiriesLoading(true);
    setEnquiriesError("");
    try {
      const response = await secureFetch("/api/enquiries");
      if (!response.ok) {
        throw new Error("Failed to load enquiries.");
      }
      const data = await response.json();
      setEnquiries(data);
    } catch (err: any) {
      console.error(err);
      setEnquiriesError(err.message || "An error occurred while loading enquiries.");
    } finally {
      setEnquiriesLoading(false);
    }
  };

  // Fetch solutions
  const fetchSolutions = async () => {
    setSolutionsLoading(true);
    setSolutionsError("");
    try {
      const response = await secureFetch("/api/solutions");
      if (!response.ok) {
        throw new Error("Failed to load solutions.");
      }
      const data = await response.json();
      setSolutions(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setSolutionsError(err.message || "An error occurred while loading solutions.");
    } finally {
      setSolutionsLoading(false);
    }
  };

  // Fetch technologies
  const fetchTechnologies = async () => {
    setTechLoading(true);
    setTechError("");
    try {
      const response = await secureFetch("/api/technologies");
      if (!response.ok) {
        throw new Error("Failed to load technologies.");
      }
      const data = await response.json();
      setTechList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setTechError(err.message || "An error occurred while loading technologies.");
    } finally {
      setTechLoading(false);
    }
  };

  // Fetch services
  const fetchServices = async () => {
    setServiceLoading(true);
    setServiceError("");
    try {
      const response = await secureFetch("/api/services");
      if (!response.ok) {
        throw new Error("Failed to load services.");
      }
      const data = await response.json();
      setServiceList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setServiceError(err.message || "An error occurred while loading services.");
    } finally {
      setServiceLoading(false);
    }
  };

  // Fetch clients
  const fetchClients = async () => {
    setClientLoading(true);
    setClientError("");
    try {
      const response = await secureFetch("/api/clients");
      if (!response.ok) {
        throw new Error("Failed to load clients.");
      }
      const data = await response.json();
      setClientList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setClientError(err.message || "An error occurred while loading clients.");
    } finally {
      setClientLoading(false);
    }
  };

  // Fetch jobs
  const fetchJobs = async () => {
    setJobLoading(true);
    setJobError("");
    try {
      const response = await secureFetch("/api/jobs");
      if (!response.ok) {
        throw new Error("Failed to load jobs.");
      }
      const data = await response.json();
      setJobList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setJobError(err.message || "An error occurred while loading jobs.");
    } finally {
      setJobLoading(false);
    }
  };

  // Fetch blogs
  const fetchBlogs = async () => {
    setBlogLoading(true);
    setBlogError("");
    try {
      const response = await secureFetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to load blogs.");
      }
      const data = await response.json();
      setBlogList(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setBlogError(err.message || "An error occurred while loading blogs.");
    } finally {
      setBlogLoading(false);
    }
  };

  // Fetch job applications
  const fetchApplications = async () => {
    setApplicationsLoading(true);
    setApplicationsError("");
    try {
      const response = await secureFetch("/api/applications");
      if (!response.ok) {
        throw new Error("Failed to load applications.");
      }
      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setApplicationsError(err.message || "An error occurred while loading applications.");
    } finally {
      setApplicationsLoading(false);
    }
  };

  // Delete application
  const handleDeleteApplication = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job application?")) return;
    setDeleteApplicationStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/applications/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete application.");
      }
      setApplications((prev) => prev.filter((item) => item.id !== id));
      setDeleteApplicationStatus(null);
    } catch (err: any) {
      console.error(err);
      setDeleteApplicationStatus(null);
      alert(err.message || "Could not delete application. Please try again.");
    }
  };

  useEffect(() => {
    if (admin) {
      fetchEnquiries();
      fetchSolutions();
      fetchTechnologies();
      fetchServices();
      fetchClients();
      fetchJobs();
      fetchBlogs();
      fetchApplications();
      fetchIndustries();
    }
  }, [admin]);

  // Delete enquiry
  const handleDeleteEnquiry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    setDeleteEnquiryStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/enquiries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete enquiry.");
      }
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
      setDeleteEnquiryStatus(null);
    } catch (err: any) {
      console.error(err);
      setDeleteEnquiryStatus(null);
      alert(err.message || "Could not delete enquiry. Please try again.");
    }
  };

  // Delete solution
  const handleDeleteSolution = async (id: number) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;
    setDeleteSolutionStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/solutions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete solution.");
      }
      setSolutions((prev) => prev.filter((item) => item.id !== id));
      setDeleteSolutionStatus(null);
      if (editingSolId === id) {
        handleCancelEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteSolutionStatus(null);
      alert(err.message || "Could not delete solution. Please try again.");
    }
  };

  // Delete technology
  const handleDeleteTech = async (id: number) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;
    setDeleteTechStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/technologies/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete technology.");
      }
      setTechList((prev) => prev.filter((item) => item.id !== id));
      setDeleteTechStatus(null);
      if (editingTechId === id) {
        handleCancelTechEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteTechStatus(null);
      alert(err.message || "Could not delete technology. Please try again.");
    }
  };

  // Delete client
  const handleDeleteClient = async (id: number) => {
    if (!confirm("Are you sure you want to delete this client record?")) return;
    setDeleteClientStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete client record.");
      }
      setClientList((prev) => prev.filter((item) => item.id !== id));
      setDeleteClientStatus(null);
      if (editingClientId === id) {
        handleCancelClientEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteClientStatus(null);
      alert(err.message || "Could not delete client record. Please try again.");
    }
  };

  // Delete job
  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job record?")) return;
    setDeleteJobStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete job record.");
      }
      setJobList((prev) => prev.filter((item) => item.id !== id));
      setDeleteJobStatus(null);
      if (editingJobId === id) {
        handleCancelJobEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteJobStatus(null);
      alert(err.message || "Could not delete job record. Please try again.");
    }
  };

  // Delete blog
  const handleDeleteBlog = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    setDeleteBlogStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete blog post.");
      }
      setBlogList((prev) => prev.filter((item) => item.id !== id));
      setDeleteBlogStatus(null);
      if (editingBlogId === id) {
        handleCancelBlogEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteBlogStatus(null);
      alert(err.message || "Could not delete blog post. Please try again.");
    }
  };

  // Start Edit Mode for Solutions
  const handleStartEdit = (item: any) => {
    setEditingSolId(item.id);
    setSolName(item.name);
    setSolImage(item.image || "");
    setSolDesc(item.description);
    
    // Safely format database array or JSON string fields for textareas
    const toTextareaVal = (field: any) => {
      if (!field) return "";
      if (Array.isArray(field)) return field.join("\n");
      try {
        const parsed = JSON.parse(field);
        if (Array.isArray(parsed)) return parsed.join("\n");
      } catch (e) {}
      if (typeof field === "string") return field;
      return "";
    };

    setSolCapabilities(toTextareaVal(item.capabilities));
    setSolMethodology(toTextareaVal(item.methodology));
    setSolDeliverables(toTextareaVal(item.deliverables));
    setSolTechnologies(toTextareaVal(item.technologies));

    setFormSuccess(false);
    setFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("solution-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Edit Mode for Solutions
  const handleCancelEdit = () => {
    setEditingSolId(null);
    setSolName("");
    setSolImage("");
    setSolDesc("");
    setSolCapabilities("");
    setSolMethodology("");
    setSolDeliverables("");
    setSolTechnologies("");
    setFormSuccess(false);
    setFormError("");
  };

  // Submit Solution (Create or Update)
  const handleSubmitSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!solName || !solDesc) return;
    
    setFormLoading(true);
    setFormError("");
    setFormSuccess(false);

    // Split line-by-line and filter out empty lines
    const capabilities = solCapabilities.split("\n").map(s => s.trim()).filter(Boolean);
    const methodology = solMethodology.split("\n").map(s => s.trim()).filter(Boolean);
    const deliverables = solDeliverables.split("\n").map(s => s.trim()).filter(Boolean);
    const technologies = solTechnologies.split("\n").map(s => s.trim()).filter(Boolean);

    const payload = {
      name: solName,
      image: solImage,
      description: solDesc,
      capabilities,
      methodology,
      deliverables,
      technologies
    };

    try {
      if (editingSolId !== null) {
        const response = await secureFetch(`/api/solutions/${editingSolId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update solution.");
        }

        const updatedSol = await response.json();
        setSolutions((prev) => prev.map((item) => item.id === editingSolId ? updatedSol : item));
        handleCancelEdit();
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/solutions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create solution.");
        }

        const newSol = await response.json();
        setSolutions((prev) => [...prev, newSol]);
        handleCancelEdit();
        setFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Could not save solution. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  // Start Tech Edit Mode
  const handleStartTechEdit = (item: any) => {
    setEditingTechId(item.id);
    setTechName(item.name);
    setTechCategory(item.category || "ENTERPRISE WEB & FRONTEND");
    setTechStatusBadge(item.status_badge || "PRODUCTION READY");
    setTechBrands(item.brands || "");
    setTechDesc(item.description);
    setTechKeywords(item.keywords || "");
    setTechHowToWork(item.how_to_work || "");
    setTechFormSuccess(false);
    setTechFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("tech-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Tech Edit Mode
  const handleCancelTechEdit = () => {
    setEditingTechId(null);
    setTechName("");
    setTechCategory("ENTERPRISE WEB & FRONTEND");
    setTechStatusBadge("PRODUCTION READY");
    setTechBrands("");
    setTechDesc("");
    setTechKeywords("");
    setTechHowToWork("");
    setTechFormSuccess(false);
    setTechFormError("");
    setShowTechCategoryPresets(false);
    setShowTechStatusPresets(false);
    setShowTechBrandsPresets(false);
  };

  // Submit Technology (Create or Update)
  const handleSubmitTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techName || !techName.trim()) return;
    
    setTechFormLoading(true);
    setTechFormError("");
    setTechFormSuccess(false);

    const payload = {
      name: techName.trim(),
      description: techDesc && techDesc.trim() ? techDesc.trim() : `${techName.trim()} enterprise stack and architecture.`,
      keywords: techKeywords || null,
      how_to_work: techHowToWork || null,
      category: techCategory || null,
      status_badge: techStatusBadge || null,
      brands: techBrands || null,
    };

    try {
      if (editingTechId !== null) {
        const response = await secureFetch(`/api/technologies/${editingTechId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update technology.");
        }

        const updatedTech = await response.json();
        setTechList((prev) => prev.map((item) => item.id === editingTechId ? updatedTech : item));
        handleCancelTechEdit();
        setTechFormSuccess(true);
        setTimeout(() => setTechFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/technologies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create technology.");
        }

        const newTech = await response.json();
        setTechList((prev) => [...prev, newTech]);
        setTechName("");
        setTechCategory("ENTERPRISE WEB & FRONTEND");
        setTechStatusBadge("PRODUCTION READY");
        setTechBrands("");
        setTechDesc("");
        setTechKeywords("");
        setTechHowToWork("");
        setTechFormSuccess(true);
        setTimeout(() => setTechFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setTechFormError(err.message || "Could not save technology. Please try again.");
    } finally {
      setTechFormLoading(false);
    }
  };

  // Start Service Edit Mode
  const handleStartServiceEdit = (item: any) => {
    setEditingServiceId(item.id);
    setServiceTitle(item.title);
    setServiceDesc(item.description);
    setServiceIcon(item.icon || "tech-consulting");
    setServiceLink(item.link || "/solutions");
    setServiceFormSuccess(false);
    setServiceFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("service-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Service Edit Mode
  const handleCancelServiceEdit = () => {
    setEditingServiceId(null);
    setServiceTitle("");
    setServiceDesc("");
    setServiceIcon("tech-consulting");
    setServiceLink("/solutions");
    setServiceFormSuccess(false);
    setServiceFormError("");
    setShowServiceIconPresets(false);
  };

  // Submit Service (Create or Update)
  const handleSubmitService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceTitle || !serviceDesc) return;

    setServiceFormLoading(true);
    setServiceFormError("");
    setServiceFormSuccess(false);

    const payload = {
      title: serviceTitle,
      description: serviceDesc,
      icon: serviceIcon || "tech-consulting",
      link: serviceLink || "/solutions",
    };

    try {
      if (editingServiceId !== null) {
        const response = await secureFetch(`/api/services/${editingServiceId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update service.");
        }

        const updatedService = await response.json();
        setServiceList((prev) => prev.map((s) => s.id === editingServiceId ? updatedService : s));
        handleCancelServiceEdit();
        setServiceFormSuccess(true);
        setTimeout(() => setServiceFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create service.");
        }

        const newService = await response.json();
        setServiceList((prev) => [...prev, newService]);
        setServiceTitle("");
        setServiceDesc("");
        setServiceIcon("tech-consulting");
        setServiceLink("/solutions");
        setServiceFormSuccess(true);
        setTimeout(() => setServiceFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setServiceFormError(err.message || "Could not save service. Please try again.");
    } finally {
      setServiceFormLoading(false);
    }
  };

  // Delete Service
  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    setDeleteServiceStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/services/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete service.");
      }
      setServiceList((prev) => prev.filter((item) => item.id !== id));
      setDeleteServiceStatus(null);
      if (editingServiceId === id) {
        handleCancelServiceEdit();
      }
    } catch (err: any) {
      console.error(err);
      setDeleteServiceStatus(null);
      alert(err.message || "Could not delete service. Please try again.");
    }
  };

  // Start Client Edit Mode
  const handleStartClientEdit = (item: any) => {
    setEditingClientId(item.id);
    setClientName(item.name);
    setClientSector(item.sector || "Banking");
    setClientImage(item.image || "");
    setClientDesc(item.description || "");
    setClientFormSuccess(false);
    setClientFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("client-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Client Edit Mode
  const handleCancelClientEdit = () => {
    setEditingClientId(null);
    setClientName("");
    setClientSector("Banking");
    setClientImage("");
    setClientDesc("");
    setClientFormSuccess(false);
    setClientFormError("");
  };

  // Submit Client (Create or Update)
  const handleSubmitClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientSector) return;
    const finalDesc = clientDesc.trim() || "Strategic enterprise client partnership & technology collaboration.";
    
    setClientFormLoading(true);
    setClientFormError("");
    setClientFormSuccess(false);

    try {
      if (editingClientId !== null) {
        const response = await secureFetch(`/api/clients/${editingClientId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: clientName, sector: clientSector, image: clientImage, description: finalDesc }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update client record.");
        }

        const updatedClient = await response.json();
        setClientList((prev) => prev.map((item) => item.id === editingClientId ? updatedClient : item));
        handleCancelClientEdit();
        setClientFormSuccess(true);
        setTimeout(() => setClientFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: clientName, sector: clientSector, image: clientImage, description: finalDesc }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create client record.");
        }

        const newClient = await response.json();
        setClientList((prev) => [...prev, newClient]);
        setClientName("");
        setClientSector("Banking");
        setClientDesc("");
        setClientImage("");
        setClientFormSuccess(true);
        setTimeout(() => setClientFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setClientFormError(err.message || "Could not save client record. Please try again.");
    } finally {
      setClientFormLoading(false);
    }
  };

  // Fetch industries
  const fetchIndustries = async () => {
    setIndustriesLoading(true);
    setIndustriesError("");
    try {
      const response = await secureFetch("/api/industries");
      if (!response.ok) {
        throw new Error("Failed to load industries.");
      }
      const data = await response.json();
      setIndustriesList(data);
    } catch (err: any) {
      console.error(err);
      setIndustriesError(err.message || "An error occurred while loading industries.");
    } finally {
      setIndustriesLoading(false);
    }
  };

  // Start Industry Edit Mode
  const handleStartIndustryEdit = (item: any) => {
    setEditingIndustryId(item.id);
    setIndustryName(item.name);
    setIndustryFormError("");
    setIndustryFormSuccess(false);
    setTimeout(() => {
      const formEl = document.getElementById("industry-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Industry Edit Mode
  const handleCancelIndustryEdit = () => {
    setEditingIndustryId(null);
    setIndustryName("");
    setIndustryFormError("");
    setIndustryFormSuccess(false);
  };

  // Submit Industry (Create or Update)
  const handleSubmitIndustry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industryName || industryName.trim() === "") return;
    
    setIndustryFormLoading(true);
    setIndustryFormError("");
    setIndustryFormSuccess(false);

    try {
      if (editingIndustryId !== null) {
        const response = await secureFetch(`/api/industries/${editingIndustryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: industryName.trim() }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update industry.");
        }

        const updated = await response.json();
        setIndustriesList((prev) => prev.map((item) => item.id === editingIndustryId ? updated : item));
        handleCancelIndustryEdit();
        setIndustryFormSuccess(true);
        setTimeout(() => setIndustryFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/industries", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: industryName.trim() }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create industry.");
        }

        const newInd = await response.json();
        setIndustriesList((prev) => [...prev, newInd]);
        setIndustryName("");
        setIndustryFormSuccess(true);
        setTimeout(() => setIndustryFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setIndustryFormError(err.message || "Could not save industry. Please try again.");
    } finally {
      setIndustryFormLoading(false);
    }
  };

  // Delete Industry
  const handleDeleteIndustry = async (id: number) => {
    if (!confirm("Are you sure you want to delete this industry?")) return;
    setDeleteIndustryStatus({ id, status: "loading" });
    try {
      const response = await secureFetch(`/api/industries/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete industry.");
      }
      setIndustriesList((prev) => prev.filter((item) => item.id !== id));
      setDeleteIndustryStatus(null);
    } catch (err: any) {
      console.error(err);
      setDeleteIndustryStatus(null);
      alert(err.message || "Could not delete industry. Please try again.");
    }
  };

  // Start Job Edit Mode
  const handleStartJobEdit = (item: any) => {
    setEditingJobId(item.id);
    setJobTitle(item.title);
    setJobLocation(item.location);
    setJobType(item.type || "Full-time");
    setJobDescription(item.description || "");
    setJobFormSuccess(false);
    setJobFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("career-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Job Edit Mode
  const handleCancelJobEdit = () => {
    setEditingJobId(null);
    setJobTitle("");
    setJobLocation("");
    setJobType("Full-time");
    setJobDescription("");
    setJobFormSuccess(false);
    setJobFormError("");
  };

  // Submit Job (Create or Update)
  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobLocation || !jobType) return;
    
    setJobFormLoading(true);
    setJobFormError("");
    setJobFormSuccess(false);

    try {
      if (editingJobId !== null) {
        const response = await secureFetch(`/api/jobs/${editingJobId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            title: jobTitle, 
            location: jobLocation, 
            type: jobType,
            description: jobDescription 
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update job record.");
        }

        const updatedJob = await response.json();
        setJobList((prev) => prev.map((item) => item.id === editingJobId ? updatedJob : item));
        handleCancelJobEdit();
        setJobFormSuccess(true);
        setTimeout(() => setJobFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            title: jobTitle, 
            location: jobLocation, 
            type: jobType,
            description: jobDescription 
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create job record.");
        }

        const newJob = await response.json();
        setJobList((prev) => [...prev, newJob]);
        setJobTitle("");
        setJobLocation("");
        setJobType("Full-time");
        setJobDescription("");
        setJobFormSuccess(true);
        setTimeout(() => setJobFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setJobFormError(err.message || "Could not save job record. Please try again.");
    } finally {
      setJobFormLoading(false);
    }
  };

  // Start Blog Edit Mode
  const handleStartBlogEdit = (item: any) => {
    setEditingBlogId(item.id);
    setBlogTitle(item.title);
    setBlogTag(item.tag || "Architecture");
    setBlogImage(item.image || "/hero-bg-1.png");
    setBlogDesc(item.description);
    try {
      const parsed = typeof item.content === "string" ? JSON.parse(item.content) : item.content;
      setBlogSections(Array.isArray(parsed) ? parsed : [{ heading: "", image: "", story: "" }]);
    } catch (e) {
      setBlogSections([{ heading: "", image: "", story: item.content }]);
    }
    setBlogFormSuccess(false);
    setBlogFormError("");
    setTimeout(() => {
      const formEl = document.getElementById("blog-form-card");
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  // Cancel Blog Edit Mode
  const handleCancelBlogEdit = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogTag("Architecture");
    setBlogImage("");
    setBlogDesc("");
    setBlogSections([{ heading: "", image: "", story: "" }]);
    setBlogFormSuccess(false);
    setBlogFormError("");
  };

  // Structured Content Section Modifiers
  const handleAddBlogSection = () => {
    setBlogSections((prev) => [...prev, { heading: "", image: "", story: "" }]);
  };

  const handleRemoveBlogSection = (index: number) => {
    setBlogSections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBlogSection = (index: number, field: "heading" | "image" | "story", value: string) => {
    setBlogSections((prev) =>
      prev.map((sec, i) => (i === index ? { ...sec, [field]: value } : sec))
    );
  };

  // Submit Blog (Create or Update)
  const handleSubmitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle || !blogTag || !blogDesc) return;
    
    setBlogFormLoading(true);
    setBlogFormError("");
    setBlogFormSuccess(false);

    const stringifiedContent = JSON.stringify(blogSections);

    try {
      if (editingBlogId !== null) {
        const response = await secureFetch(`/api/blogs/${editingBlogId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: blogTitle, tag: blogTag, image: blogImage, description: blogDesc, content: stringifiedContent }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to update blog post.");
        }

        const updatedBlog = await response.json();
        setBlogList((prev) => prev.map((item) => item.id === editingBlogId ? updatedBlog : item));
        handleCancelBlogEdit();
        setBlogFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      } else {
        const response = await secureFetch("/api/blogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: blogTitle, tag: blogTag, image: blogImage, description: blogDesc, content: stringifiedContent }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create blog post.");
        }

        const newBlog = await response.json();
        setBlogList((prev) => [...prev, newBlog]);
        setBlogTitle("");
        setBlogTag("Architecture");
        setBlogDesc("");
        setBlogImage("/hero-bg-1.png");
        setBlogSections([{ heading: "", image: "", story: "" }]);
        setBlogFormSuccess(true);
        setTimeout(() => setFormSuccess(false), 3000);
      }
    } catch (err: any) {
      console.error(err);
      setBlogFormError(err.message || "Could not save blog post. Please try again.");
    } finally {
      setBlogFormLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await secureFetch("/api/logout", {
        method: "POST"
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    localStorage.removeItem("user");
    navigate({ to: "/login" });
  };

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const refreshAllData = () => {
    fetchEnquiries();
    fetchSolutions();
    fetchTechnologies();
    fetchServices();
    fetchClients();
    fetchJobs();
    fetchBlogs();
    fetchApplications();
  };

  // Sidebar navigation component
  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-zinc-950 text-zinc-200 select-none">
      <div className="flex-1 overflow-y-auto">
        {/* Branding */}
        <div className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-border/30 bg-zinc-950/95 backdrop-blur-md px-6">
          <img src="/logo.png" className="h-10 w-auto object-contain" alt="Logo" />
          <span className="font-display text-lg font-bold tracking-tight text-white">Regal Ops Portal</span>
        </div>

        {/* Profile Card */}
        <div className="px-6 py-5 border-b border-border/20">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Logged In As</p>
          <h4 className="mt-1 font-semibold text-white truncate">{admin?.name || "Administrator"}</h4>
          <p className="text-xs text-zinc-400 truncate">{admin?.email || "admin@regalops.com"}</p>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {[
            { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard, count: null, isNotify: false, badgeClass: "" },
            { id: "enquiries" as const, label: "Enquiries", icon: Inbox, count: enquiries.length, isNotify: true, badgeClass: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
            { id: "solutions" as const, label: "Manage Solutions", icon: Layers, count: solutions.length },
            { id: "technologies" as const, label: "Manage Technologies", icon: Cpu, count: techList.length },
            { id: "services" as const, label: "Manage Services", icon: Compass, count: serviceList.length },
            { id: "clients" as const, label: "Manage Clients", icon: User, count: clientList.length },
            { id: "careers" as const, label: "Manage Careers", icon: Briefcase, count: jobList.length, isNotify: true, badgeClass: "bg-[#555d25]/40 text-[#e4ebb2] border-[#555d25]/60" },
            { id: "blogs" as const, label: "Manage Blogs", icon: BookOpen, count: blogList.length },
            { id: "applications" as const, label: "Applications", icon: FileText, count: applications.length, isNotify: true, badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
                }`}
              >
                <div className="relative shrink-0 flex items-center justify-center">
                  <Icon className="h-4.5 w-4.5" />
                  {item.isNotify && item.count !== null && item.count > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </div>
                <span className="whitespace-nowrap tracking-tight">{item.label}</span>
                {item.count !== null ? (
                  <span
                    className={`ml-auto shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : item.isNotify && item.count > 0
                          ? `${item.badgeClass} border shadow-xs`
                          : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {item.isNotify && item.count > 0 && (
                      <Bell className="h-2.5 w-2.5 shrink-0" />
                    )}
                    {item.count}
                  </span>
                ) : (
                  <span
                    className={`ml-auto shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    Hub
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border/20 bg-zinc-950 shrink-0">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
        >
          <LogOut className="h-4.5 w-4.5" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className={`admin-portal flex min-h-screen transition-colors duration-200 ${adminTheme === "dark" ? "dark bg-zinc-950 text-zinc-100" : "bg-slate-50/70 text-slate-900"}`}>
      
      {/* 1. Desktop Sidebar (Left) */}
      <aside className="hidden w-72 shrink-0 border-r border-border/70 xl:block sticky top-0 h-screen z-30">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Sidebar Overlay & Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex w-72 max-w-xs flex-col border-r border-border bg-background animate-in slide-in-from-left duration-200 shadow-2xl">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-4 top-4 rounded-xl border border-border p-1.5 text-muted-foreground bg-background hover:text-foreground cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* 3. Right Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Main Panel Header */}
        <header className={`sticky top-0 z-40 flex h-16 items-center justify-between border-b px-3.5 sm:px-6 backdrop-blur-xl transition-colors ${
          adminTheme === "dark"
            ? "border-zinc-800/80 bg-zinc-950/85"
            : "border-slate-200/80 bg-white/85 shadow-2xs"
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className={`rounded-xl border p-2 transition-all xl:hidden cursor-pointer ${
                adminTheme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-2xs"
              }`}
              aria-label="Open sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="hidden sm:flex h-9 w-9 rounded-xl bg-gradient-to-br from-[#555d25] to-[#b38e36] items-center justify-center text-white font-black text-sm shrink-0 shadow-xs">
                R
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Admin Portal</span>
                  <span className="hidden sm:inline-block text-muted-foreground text-xs">•</span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold truncate text-foreground tracking-tight">
                  {activeTab === "dashboard"
                    ? "Control Center Dashboard"
                    : activeTab === "enquiries" 
                      ? "Contact Enquiries" 
                      : activeTab === "solutions"
                        ? "Manage Solutions"
                        : activeTab === "technologies"
                          ? "Manage Technologies"
                          : activeTab === "services"
                            ? "Manage Services"
                            : activeTab === "clients"
                              ? "Manage Clients"
                              : activeTab === "careers"
                                ? "Manage Careers"
                                : activeTab === "blogs"
                                  ? "Manage Blogs"
                                  : "Job Applications"}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Unified Notification Center Button */}
            <div className="relative" ref={notificationsRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative inline-flex items-center justify-center h-9 px-2.5 sm:px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                  notificationsOpen
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : adminTheme === "dark"
                      ? "border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:bg-zinc-800"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                title="Notifications & Activity"
              >
                <Bell className="h-4 w-4" />
                {(enquiries.length > 0 || applications.length > 0) && (
                  <span className="ml-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs">
                    {enquiries.length + applications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown / Sheet */}
              {notificationsOpen && (
                <>
                  {/* Backdrop for closing on mobile */}
                  <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] sm:hidden"
                    onClick={() => setNotificationsOpen(false)}
                  />

                  <div className={`fixed left-3 right-3 top-16 sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 rounded-2xl border p-4 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-150 ${
                    adminTheme === "dark"
                      ? "bg-zinc-900 border-zinc-800 text-zinc-100"
                      : "bg-white border-slate-200 text-slate-900"
                  }`}>
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-primary" />
                      <span className="font-bold text-sm">Notifications & Alerts</span>
                    </div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-muted-foreground hover:text-foreground text-xs p-1 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="py-2 space-y-2">
                    {/* Enquiries alert */}
                    <div 
                      onClick={() => { setActiveTab("enquiries"); setNotificationsOpen(false); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        activeTab === "enquiries"
                          ? "border-primary/50 bg-primary/10"
                          : adminTheme === "dark"
                            ? "border-zinc-800 hover:bg-zinc-800/60"
                            : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="h-8 w-8 rounded-lg bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0">
                        <Inbox className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs">Client Enquiries</p>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-500">
                            {enquiries.length} new
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                          {enquiries.length > 0 ? `${enquiries[0]?.first_name || "Lead"} submitted a form message` : "No new messages"}
                        </p>
                      </div>
                    </div>

                    {/* Job Applications alert */}
                    <div 
                      onClick={() => { setActiveTab("applications"); setNotificationsOpen(false); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        activeTab === "applications"
                          ? "border-primary/50 bg-primary/10"
                          : adminTheme === "dark"
                            ? "border-zinc-800 hover:bg-zinc-800/60"
                            : "border-slate-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="h-8 w-8 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xs">Job Applications</p>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-600">
                            {applications.length} total
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                          {applications.length > 0 ? `${applications[0]?.first_name} applied for ${applications[0]?.job_title}` : "No candidate resumes"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              )}
            </div>

            {/* Theme Switcher Toggle (Executive Dark / Crisp Modern Light) */}
            <button
              type="button"
              onClick={toggleAdminTheme}
              className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                adminTheme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-amber-400 hover:bg-zinc-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
              title={adminTheme === "dark" ? "Switch to Crisp Light Mode" : "Switch to Executive Dark Mode"}
            >
              {adminTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Live Site Preview Link */}
            <a
              href={
                activeTab === "dashboard"
                  ? "/"
                  : activeTab === "clients"
                    ? "/clients"
                    : activeTab === "solutions"
                      ? "/solutions"
                      : activeTab === "technologies"
                        ? "/technologies"
                        : activeTab === "careers" || activeTab === "applications"
                          ? "/career"
                          : activeTab === "blogs"
                            ? "/blog"
                            : "/contact"
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 h-9 text-xs font-semibold transition-all shadow-2xs ${
                adminTheme === "dark"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                  : "border-[#555d25]/30 bg-[#555d25]/10 text-[#555d25] hover:bg-[#555d25] hover:text-white"
              }`}
              title="Open live public page in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Live Page</span>
            </a>

            {/* Refresh Data button */}
            <button
              onClick={() => {
                fetchEnquiries();
                fetchSolutions();
                fetchTechnologies();
                fetchServices();
                fetchClients();
                fetchJobs();
                fetchBlogs();
                fetchApplications();
              }}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 h-9 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                adminTheme === "dark"
                  ? "border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
              title="Refresh Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${enquiriesLoading || solutionsLoading || techLoading || serviceLoading || clientLoading || jobLoading || blogLoading ? "animate-spin text-primary" : ""}`} />
              <span className="hidden lg:inline">Refresh</span>
            </button>
          </div>
        </header>

        {/* Main Panel Content Area */}
        <main className="flex-1 p-2 sm:p-3.5 md:p-4 w-full">
          
          <div id="admin-tab-content" className="scroll-mt-6" />

          {/* Active Tab Panel Rendering */}
          {activeTab === "dashboard" && (
            <div className="space-y-4 animate-in fade-in-50 duration-200">
              {/* 3. All Tabs & Modules Master Navigation Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                      All Portal Modules &amp; Tabs
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Select any category below to manage its live contents, edit records, or create new entries.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {/* Module 1: Enquiries */}
                  <div
                    onClick={() => setActiveTab("enquiries")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-rose-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Inbox className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                          {enquiries.length} Messages
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        Client Enquiries
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Review inbound technical requests, consultation leads, email enquiries, and phone call requests.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400">
                      <span>Manage Enquiries</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 2: Applications */}
                  <div
                    onClick={() => setActiveTab("applications")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <FileText className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                          {applications.length} Candidates
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        Job Applications
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Candidate resumes, contact details, role applied, and downloadable PDF CV attachments.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
                      <span>Review Applications</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 3: Solutions */}
                  <div
                    onClick={() => setActiveTab("solutions")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-violet-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Layers className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400 border border-violet-500/25">
                          {solutions.length} Practices
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        Manage Solutions
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Core practice offerings, detailed architecture delivery pod descriptions, and practice imagery.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-violet-600 dark:text-violet-400">
                      <span>Manage Solutions</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 4: Technologies */}
                  <div
                    onClick={() => setActiveTab("technologies")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-cyan-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Cpu className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/25">
                          {techList.length} Stacks
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        Manage Tech Stack
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Architecture registries, certified frameworks, runtime libraries, and production badges.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                      <span>Manage Tech Stack</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 5: Services */}
                  <div
                    onClick={() => setActiveTab("services")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Compass className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25">
                          {serviceList.length} Services
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Manage Services
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Homepage service carousel offerings, strategic consulting, infrastructure build, and cloud operations.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Manage Services</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 6: Clients */}
                  <div
                    onClick={() => setActiveTab("clients")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-orange-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Users className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/25">
                          {clientList.length} Partners
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                        Manage Clients
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Fortune 1000 logos, case studies, enterprise testimonials, industry badges, and partner categories.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-orange-600 dark:text-orange-400">
                      <span>Manage Clients</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 7: Careers */}
                  <div
                    onClick={() => setActiveTab("careers")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-lime-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-lime-500/15 text-lime-600 dark:text-lime-400 border border-lime-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-lime-500/15 text-lime-600 dark:text-lime-400 border border-lime-500/25">
                          {jobList.length} Open Roles
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                        Manage Careers
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Engineering requisitions, senior developer vacancies, experience levels, and office locations.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-lime-600 dark:text-lime-400">
                      <span>Manage Careers</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Module 8: Blogs */}
                  <div
                    onClick={() => setActiveTab("blogs")}
                    className="group relative rounded-2xl border border-border/80 bg-card p-4 sm:p-4.5 shadow-xs hover:border-pink-500/50 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="h-10 w-10 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/25 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-600 dark:text-pink-400 border border-pink-500/25">
                          {blogList.length} Articles
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                        Manage Blogs
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        Engineering articles, tech reviews, cloud post-mortems, author tags, and publishing dates.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-pink-600 dark:text-pink-400">
                      <span>Manage Blogs</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Recent Activity & Feeds (2-Column Split) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Recent Enquiries Preview */}
                <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                        <Inbox className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">Recent Client Inquiries</h4>
                    </div>
                    <button
                      onClick={() => setActiveTab("enquiries")}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({enquiries.length})</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {enquiries.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted-foreground">
                      No inquiries recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {enquiries.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setActiveTab("enquiries")}
                          className="p-3 rounded-xl border border-border/60 bg-surface/50 hover:bg-surface hover:border-primary/40 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground truncate">
                                {[item.first_name, item.last_name].filter(Boolean).join(" ") || "Prospect Lead"}
                              </span>
                              {item.service && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary truncate max-w-[120px]">
                                  {item.service}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {item.email || item.mobile || "No contact info provided"}
                            </p>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Applications Preview */}
                <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">Recent Candidate Submissions</h4>
                    </div>
                    <button
                      onClick={() => setActiveTab("applications")}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All ({applications.length})</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {applications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-muted-foreground">
                      No candidate applications received yet.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {applications.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setActiveTab("applications")}
                          className="p-3 rounded-xl border border-border/60 bg-surface/50 hover:bg-surface hover:border-amber-500/40 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground truncate">
                                {item.first_name || "Applicant"}
                              </span>
                              {item.job_title && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 truncate max-w-[140px]">
                                  {item.job_title}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                              {item.email || item.mobile}
                            </p>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0 ml-2">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : "Recent"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Active Tab Panel Rendering */}
          {activeTab === "enquiries" && (() => {
            const distinctServices = Array.from(new Set(enquiries.map((e) => e.service).filter(Boolean)));
            const filteredEnquiries = enquiries.filter((item) => {
              const q = enquirySearchQuery.toLowerCase().trim();
              const fullName = [item.first_name, item.last_name].filter(Boolean).join(" ").toLowerCase();
              const matchesSearch =
                !q ||
                fullName.includes(q) ||
                (item.email && item.email.toLowerCase().includes(q)) ||
                (item.mobile && item.mobile.toLowerCase().includes(q)) ||
                (item.service && item.service.toLowerCase().includes(q)) ||
                (item.comments && item.comments.toLowerCase().includes(q)) ||
                (item.city && item.city.toLowerCase().includes(q)) ||
                (item.state && item.state.toLowerCase().includes(q));

              const matchesService = enquiryServiceFilter === "all" || item.service === enquiryServiceFilter;

              const status = leadStatuses[item.id] || "new";
              const matchesStatus =
                enquiryStatusFilter === "all" ||
                (enquiryStatusFilter === "new" && status === "new") ||
                (enquiryStatusFilter === "contacted" && status !== "new");

              return matchesSearch && matchesService && matchesStatus;
            });

            return (
              <div className="space-y-3">
                {/* Section Header with CRM Stats, Export Actions & Toolbar */}
                <div className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                  adminTheme === "dark"
                    ? "bg-zinc-900/80 border-zinc-800"
                    : "bg-white border-slate-200/90 shadow-xs"
                }`}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-xl font-bold text-foreground tracking-tight">Contact Enquiries</h2>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary border border-primary/20">
                          {enquiries.length} {enquiries.length === 1 ? "lead" : "leads"}
                        </span>
                        {enquiries.length > 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" />
                            Live CRM
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Client inquiries, leads & messages received through the public contact portal.
                      </p>
                    </div>

                    {/* Fast Export CTA Buttons */}
                    {enquiries.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={exportEnquiriesCSV}
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                            adminTheme === "dark"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "border-[#555d25]/30 bg-[#555d25]/10 text-[#555d25] hover:bg-[#555d25] hover:text-white"
                          }`}
                          title="Export all leads as a CSV spreadsheet"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Export CSV</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Toolbar: Search, Filters & View Mode */}
                  {enquiries.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      {/* Search Bar */}
                      <div className="relative flex-1 min-w-[200px] max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                        <input
                          type="text"
                          value={enquirySearchQuery}
                          onChange={(e) => setEnquirySearchQuery(e.target.value)}
                          placeholder="Search by name, email, phone, city, notes..."
                          className={`w-full rounded-xl border pl-9 pr-8 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
                            adminTheme === "dark"
                              ? "bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                              : "bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
                          }`}
                        />
                        {enquirySearchQuery && (
                          <button
                            type="button"
                            onClick={() => setEnquirySearchQuery("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs p-1"
                          >
                            ×
                          </button>
                        )}
                      </div>

                      {/* Filters & View Switches */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Service Filter */}
                        {distinctServices.length > 0 && (
                          <div className="relative">
                            <select
                              value={enquiryServiceFilter}
                              onChange={(e) => setEnquiryServiceFilter(e.target.value)}
                              aria-label="Filter enquiries by service"
                              className={`rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer pr-8 appearance-none ${
                                adminTheme === "dark"
                                  ? "bg-zinc-800/80 border-zinc-700 text-zinc-100"
                                  : "bg-slate-50 border-slate-200 text-slate-800"
                              }`}
                            >
                              <option value="all">All Services ({enquiries.length})</option>
                              {distinctServices.map((svc: string) => (
                                <option key={svc} value={svc}>
                                  {svc}
                                </option>
                              ))}
                            </select>
                            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
                          </div>
                        )}

                        {/* Status Filter */}
                        <div className="relative">
                          <select
                            value={enquiryStatusFilter}
                            onChange={(e) => setEnquiryStatusFilter(e.target.value as any)}
                            aria-label="Filter by CRM status"
                            className={`rounded-xl border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer pr-8 appearance-none ${
                              adminTheme === "dark"
                                ? "bg-zinc-800/80 border-zinc-700 text-zinc-100"
                                : "bg-slate-50 border-slate-200 text-slate-800"
                            }`}
                          >
                            <option value="all">All Statuses</option>
                            <option value="new">New Leads</option>
                            <option value="contacted">Contacted / In Progress</option>
                          </select>
                          <ChevronRight className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none rotate-90" />
                        </div>

                        {/* View Switcher: Cards vs Table */}
                        <div className="inline-flex rounded-xl border border-border/80 bg-secondary/40 p-0.5">
                          <button
                            type="button"
                            onClick={() => setEnquiryViewMode("cards")}
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                              enquiryViewMode === "cards"
                                ? "bg-surface text-primary shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            title="Card Grid View"
                          >
                            <LayoutGrid className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Cards</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEnquiryViewMode("table")}
                            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                              enquiryViewMode === "table"
                                ? "bg-surface text-primary shadow-xs"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            title="Data Table View"
                          >
                            <List className="h-3.5 w-3.5" />
                            <span className="hidden sm:inline">Table</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* State: Loading */}
                {enquiriesLoading && enquiries.length === 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="h-60 rounded-2xl border border-border/50 bg-secondary/30"></div>
                    ))}
                  </div>
                ) : enquiriesError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{enquiriesError}</p>
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className={`p-12 text-center border border-dashed rounded-2xl flex flex-col items-center justify-center ${
                    adminTheme === "dark" ? "border-zinc-800 bg-zinc-900/40" : "border-slate-300 bg-white"
                  }`}>
                    <div className="rounded-full bg-primary/10 p-4 text-primary">
                      <Inbox className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No enquiries received yet</h3>
                    <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                      When prospective clients submit requests through the website contact form, they will appear here in real-time.
                    </p>
                  </div>
                ) : filteredEnquiries.length === 0 ? (
                  <div className={`p-10 text-center border rounded-2xl flex flex-col items-center justify-center ${
                    adminTheme === "dark" ? "border-zinc-800 bg-zinc-900/40" : "border-slate-200 bg-white"
                  }`}>
                    <Search className="h-8 w-8 text-muted-foreground/60 mb-2" />
                    <h3 className="text-sm font-semibold text-foreground">No matching enquiries</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      No client leads matched your search keyword or selected filters.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setEnquirySearchQuery("");
                        setEnquiryServiceFilter("all");
                        setEnquiryStatusFilter("all");
                      }}
                      className="mt-3 text-xs font-semibold text-primary hover:underline cursor-pointer"
                    >
                      Clear search & filters
                    </button>
                  </div>
                ) : enquiryViewMode === "cards" ? (
                  /* Executive CRM Cards View */
                  <div className="grid gap-5 md:grid-cols-2">
                    {filteredEnquiries.map((item) => {
                      const cleanName =
                        [item.first_name, item.last_name]
                          .filter(Boolean)
                          .map((s: string) => s.trim())
                          .filter((s: string) => s && s !== "-")
                          .join(" ") || "Client Lead";

                      const initials =
                        cleanName
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((w: string) => w[0]?.toUpperCase())
                          .join("") || "L";

                      const locationString = [item.city, item.state, item.country, item.zip_code]
                        .filter(Boolean)
                        .join(", ");

                      const formattedDate = item.created_at
                        ? new Date(item.created_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A";

                      const currentStatus = leadStatuses[item.id] || "new";
                      const waLink = getWhatsAppLink(item.mobile, cleanName);

                      return (
                        <div
                          key={item.id}
                          className={`group relative rounded-2xl border p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                            adminTheme === "dark"
                              ? "bg-zinc-900/90 border-zinc-800 hover:border-primary/50 text-zinc-100"
                              : "bg-white border-slate-200/90 hover:border-[#555d25]/50 text-slate-900"
                          }`}
                        >
                          {/* Accent Gradient Border on Top */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#555d25] via-[#b38e36] to-transparent opacity-90" />

                          <div>
                            {/* Card Top Row: Avatar, Clean Name, Service Pill, Date & Status */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#555d25] to-[#b38e36] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs relative">
                                  {initials}
                                  {currentStatus === "new" && (
                                    <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h4 className="font-bold text-base text-foreground truncate">
                                      {cleanName}
                                    </h4>
                                    {item.service && (
                                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                                        <Layers className="h-3 w-3" />
                                        {item.service}
                                      </span>
                                    )}
                                  </div>
                                  {locationString && (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                      <MapPin className="h-3 w-3 text-primary/80 shrink-0" />
                                      <span className="truncate">{locationString}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="inline-flex items-center gap-1 rounded-lg bg-secondary/60 border border-border/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                                  <Calendar className="h-3 w-3" />
                                  {formattedDate}
                                </span>

                                {/* Status Pill Selector */}
                                <select
                                  value={currentStatus}
                                  onChange={(e) => updateLeadStatus(item.id, e.target.value as any)}
                                  aria-label="Update lead CRM status"
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none transition-colors ${
                                    currentStatus === "new"
                                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                                      : currentStatus === "contacted"
                                        ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                                        : currentStatus === "in_discussion"
                                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30"
                                          : "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30"
                                  }`}
                                >
                                  <option value="new">● New Lead</option>
                                  <option value="contacted">● Contacted</option>
                                  <option value="in_discussion">● In Discussion</option>
                                  <option value="closed">● Closed</option>
                                </select>
                              </div>
                            </div>

                            {/* Contact Details Interactive Chips */}
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              {item.email && (
                                <a
                                  href={`mailto:${item.email}?subject=Regal%20OPs%20-%20Regarding%20your%20enquiry`}
                                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                                    adminTheme === "dark"
                                      ? "border-zinc-800 bg-zinc-800/60 hover:bg-zinc-800 hover:border-primary/40 text-zinc-200 hover:text-white"
                                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-primary/40 text-slate-800 hover:text-primary"
                                  }`}
                                  title={`Email ${item.email}`}
                                >
                                  <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span className="truncate max-w-[190px]">{item.email}</span>
                                </a>
                              )}

                              {item.mobile && (
                                <a
                                  href={`tel:${item.mobile}`}
                                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                                    adminTheme === "dark"
                                      ? "border-zinc-800 bg-zinc-800/60 hover:bg-zinc-800 hover:border-primary/40 text-zinc-200 hover:text-white"
                                      : "border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-primary/40 text-slate-800 hover:text-primary"
                                  }`}
                                  title={`Call ${item.mobile}`}
                                >
                                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span>{item.mobile}</span>
                                </a>
                              )}

                              {/* Direct WhatsApp Action Link */}
                              {waLink && (
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-all cursor-pointer"
                                  title="Chat with client on WhatsApp"
                                >
                                  <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                  <span>WhatsApp</span>
                                </a>
                              )}
                            </div>

                            {/* Client Message / Comments Quote Block */}
                            <div className={`mt-4 rounded-xl border p-3.5 transition-colors ${
                              adminTheme === "dark"
                                ? "border-zinc-800 bg-zinc-800/40"
                                : "border-slate-100 bg-slate-50/70"
                            }`}>
                              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                  <span>Client Message / Notes</span>
                                </div>
                                {item.comments && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(item.comments);
                                    }}
                                    className="text-[10px] text-muted-foreground hover:text-primary cursor-pointer"
                                    title="Copy client message"
                                  >
                                    Copy Message
                                  </button>
                                )}
                              </div>
                              <p className="text-xs sm:text-sm leading-relaxed text-foreground whitespace-pre-wrap font-normal">
                                {item.comments?.trim() ? (
                                  item.comments
                                ) : (
                                  <span className="italic text-muted-foreground text-xs">No additional message provided.</span>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              {item.email && (
                                <a
                                  href={`mailto:${item.email}?subject=Regal%20OPs%20-%20Response%20to%20your%20enquiry`}
                                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-2xs hover:opacity-95 transition-all cursor-pointer"
                                >
                                  <Send className="h-3 w-3" />
                                  <span>Reply Email</span>
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() => handleCopyEnquiry(item)}
                                className={`inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                                  adminTheme === "dark"
                                    ? "border-zinc-800 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300"
                                    : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
                                }`}
                                title="Copy Contact Summary"
                              >
                                {copiedEnquiryId === item.id ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-emerald-600 font-semibold text-[11px]">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-[11px]">Copy</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete the enquiry from "${cleanName}"?`)) {
                                  handleDeleteEnquiry(item.id);
                                }
                              }}
                              disabled={deleteEnquiryStatus?.id === item.id && deleteEnquiryStatus?.status === "loading"}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/25 bg-rose-500/5 hover:bg-rose-500 hover:text-white px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 transition-all disabled:opacity-50 cursor-pointer"
                              title="Delete enquiry"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>
                                {deleteEnquiryStatus?.id === item.id && deleteEnquiryStatus?.status === "loading"
                                  ? "Deleting..."
                                  : "Delete"}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Executive Responsive Data Table View */
                  <div className={`rounded-2xl border overflow-hidden shadow-xs ${
                    adminTheme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200/90"
                  }`}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className={`border-b text-[11px] font-bold uppercase tracking-wider text-muted-foreground ${
                          adminTheme === "dark" ? "bg-zinc-800/60 border-zinc-800" : "bg-slate-50 border-slate-200"
                        }`}>
                          <tr>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Service</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Contact Channels</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Message</th>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {filteredEnquiries.map((item) => {
                            const cleanName =
                              [item.first_name, item.last_name]
                                .filter(Boolean)
                                .map((s: string) => s.trim())
                                .filter((s: string) => s && s !== "-")
                                .join(" ") || "Lead";

                            const initials =
                              cleanName
                                .split(" ")
                                .filter(Boolean)
                                .slice(0, 2)
                                .map((w: string) => w[0]?.toUpperCase())
                                .join("") || "E";

                            const locationString = [item.city, item.state, item.country, item.zip_code]
                              .filter(Boolean)
                              .join(", ") || "—";

                            const formattedDate = item.created_at
                              ? new Date(item.created_at).toLocaleDateString(undefined, {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "—";

                            const currentStatus = leadStatuses[item.id] || "new";
                            const waLink = getWhatsAppLink(item.mobile, cleanName);

                            return (
                              <tr key={item.id} className={`transition-colors ${
                                adminTheme === "dark" ? "hover:bg-zinc-800/40" : "hover:bg-slate-50"
                              }`}>
                                <td className="py-3 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#555d25] to-[#b38e36] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                      {initials}
                                    </div>
                                    <span className="font-bold text-foreground whitespace-nowrap">{cleanName}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase bg-primary/10 text-primary border border-primary/20">
                                    {item.service || "—"}
                                  </span>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <select
                                    value={currentStatus}
                                    onChange={(e) => updateLeadStatus(item.id, e.target.value as any)}
                                    aria-label="Update lead status"
                                    className="text-[10px] font-bold uppercase rounded-md px-1.5 py-0.5 border border-border bg-surface cursor-pointer focus:outline-none"
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="in_discussion">Discussion</option>
                                    <option value="closed">Closed</option>
                                  </select>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap">
                                  <div className="flex items-center gap-2">
                                    {item.email && (
                                      <a href={`mailto:${item.email}`} className="text-muted-foreground hover:text-primary transition-colors" title={item.email}>
                                        <Mail className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                    {item.mobile && (
                                      <a href={`tel:${item.mobile}`} className="text-muted-foreground hover:text-primary transition-colors" title={item.mobile}>
                                        <Phone className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                    {waLink && (
                                      <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 transition-colors" title="WhatsApp Direct">
                                        <WhatsAppIcon className="h-3.5 w-3.5" />
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3 px-4 text-muted-foreground max-w-[150px] truncate" title={locationString}>
                                  {locationString}
                                </td>
                                <td className="py-3 px-4 max-w-[200px]">
                                  <p className="line-clamp-2 text-foreground/90 text-xs" title={item.comments}>
                                    {item.comments || <span className="italic text-muted-foreground text-[11px]">No message</span>}
                                  </p>
                                </td>
                                <td className="py-3 px-4 whitespace-nowrap text-muted-foreground">
                                  {formattedDate}
                                </td>
                                <td className="py-3 px-4 text-right whitespace-nowrap">
                                  <div className="inline-flex items-center gap-1.5 justify-end">
                                    <button
                                      type="button"
                                      onClick={() => handleCopyEnquiry(item)}
                                      className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                                      title="Copy Contact Details"
                                    >
                                      {copiedEnquiryId === item.id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (window.confirm(`Delete enquiry from "${cleanName}"?`)) {
                                          handleDeleteEnquiry(item.id);
                                        }
                                      }}
                                      disabled={deleteEnquiryStatus?.id === item.id && deleteEnquiryStatus?.status === "loading"}
                                      className="p-1.5 rounded-lg border border-rose-500/30 hover:bg-rose-500 hover:text-white text-rose-500 transition-all cursor-pointer disabled:opacity-50"
                                      title="Delete"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {activeTab === "solutions" && (
            <div className="space-y-6">
              
              {/* 1. Form FIRST at the top */}
              <div id="solution-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingSolId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {editingSolId !== null ? "Edit Solution" : "Add New Solution"}
                      </h2>
                      <p className="text-[11px] text-muted-foreground">
                        {editingSolId !== null 
                          ? "Update practice specifications, media, and enterprise deliverables." 
                          : "Configure a new specialized practice area to showcase on the live portal."}
                      </p>
                    </div>
                  </div>
                  {editingSolId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {formSuccess && (
                  <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Solution {editingSolId !== null ? "updated" : "created"} and published successfully!</span>
                  </div>
                )}

                {formError && (
                  <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitSolution} className="space-y-3">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
                    {/* Left Column: Solution Identity & Image */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Solution Name *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Artificial Intelligence Consulting"
                          value={solName}
                          onChange={(e) => setSolName(e.target.value)}
                          required
                          disabled={formLoading}
                        />
                      </div>

                      <ImageUploadField
                        label="Solution Image"
                        value={solImage}
                        onChange={setSolImage}
                        disabled={formLoading}
                        recommendedDimensions="1200 × 700 px (16:9)"
                        compact={true}
                      />

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Description *
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                          placeholder="Describe what this solution entails..."
                          value={solDesc}
                          onChange={(e) => setSolDesc(e.target.value)}
                          required
                          disabled={formLoading}
                        />
                      </div>
                    </div>

                    {/* Right Column: Capabilities, Methodology & Deliverables */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Core Capabilities (One per line)
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Domain-Driven Development (DDD)&#10;High-throughput event-driven microservices"
                          value={solCapabilities}
                          onChange={(e) => setSolCapabilities(e.target.value)}
                          disabled={formLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Delivery Methodology Phases (One per line)
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Discovery & Event Storming&#10;Target Architecture Blueprinting"
                          value={solMethodology}
                          onChange={(e) => setSolMethodology(e.target.value)}
                          disabled={formLoading}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Key Deliverables
                          </label>
                          <textarea
                            rows={2}
                            className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            placeholder="e.g. OpenAPI specs&#10;Test suites"
                            value={solDeliverables}
                            onChange={(e) => setSolDeliverables(e.target.value)}
                            disabled={formLoading}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Featured Technologies
                          </label>
                          <textarea
                            rows={2}
                            className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            placeholder="e.g. Node.js&#10;TypeScript"
                            value={solTechnologies}
                            onChange={(e) => setSolTechnologies(e.target.value)}
                            disabled={formLoading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons (Right-aligned compact bar) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    {editingSolId !== null && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                        disabled={formLoading}
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={formLoading || !solName || !solDesc}
                      className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                    >
                      {formLoading 
                        ? "Saving Solution..." 
                        : editingSolId !== null 
                          ? "Update Solution" 
                          : "Publish Solution"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Added Details List NEXT (Kindha na) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Current Solutions</h2>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                      {solutions.length}
                    </span>
                  </div>
                  <a
                    href="/solutions"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {solutionsLoading && solutions.length === 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28 rounded-2xl"></div>
                    ))}
                  </div>
                ) : solutionsError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{solutionsError}</p>
                  </div>
                ) : solutions.length === 0 ? (
                  <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No solutions yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create your first solution using the form above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {solutions.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                          editingSolId === item.id 
                            ? "border-primary bg-primary/5 ring-2 ring-primary/25" 
                            : "border-border/85 hover:border-primary/40 hover:shadow-md"
                        }`}
                      >
                        <div>
                          <div className="flex gap-3.5 items-start">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  if (!target.dataset.fallback) {
                                    target.dataset.fallback = "true";
                                    target.src = "/solutions-training.jpg";
                                  }
                                }}
                                className="h-16 w-20 rounded-xl object-cover border border-border/80 shrink-0 bg-secondary"
                              />
                            ) : (
                              <div className="h-16 w-20 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60">
                                <ImageIcon className="h-6 w-6" />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.name}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                          <Link
                            to="/solutions/$id"
                            params={{ id: String(item.id) }}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors"
                          >
                            <span>Preview</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className={`inline-flex items-center gap-1 h-8 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                                editingSolId === item.id 
                                  ? "border-primary bg-primary text-primary-foreground" 
                                  : "border-border bg-background text-foreground hover:bg-secondary"
                              }`}
                              title="Edit Solution"
                              disabled={formLoading}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteSolution(item.id)}
                              disabled={deleteSolutionStatus?.id === item.id && deleteSolutionStatus?.status === "loading"}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                              title="Delete Solution"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === "technologies" && (
            <div className="space-y-6">
              
              {/* 1. Form FIRST at the top (Paina) */}
              <div id="tech-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingTechId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {editingTechId !== null ? "Edit Technology" : "Add New Technology"}
                      </h2>
                      <p className="text-[11px] text-muted-foreground">
                        {editingTechId !== null 
                          ? "Update technology specifications, category badge, and brand associations." 
                          : "Configure a new technology or engineering stack capability."}
                      </p>
                    </div>
                  </div>
                  {editingTechId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelTechEdit}
                      className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {techFormSuccess && (
                  <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Technology {editingTechId !== null ? "updated" : "created"} and published successfully!</span>
                  </div>
                )}

                {techFormError && (
                  <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{techFormError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitTech} className="space-y-3">
                  {/* Top 3-Column Grid utilizing full screen width */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                    {/* Col 1: Name & Keywords */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Technology Name *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. React & Next.js"
                          value={techName}
                          onChange={(e) => setTechName(e.target.value)}
                          required
                          disabled={techFormLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Keywords (comma separated)
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Components, SSR, TypeScript"
                          value={techKeywords}
                          onChange={(e) => setTechKeywords(e.target.value)}
                          disabled={techFormLoading}
                        />
                      </div>
                    </div>

                    {/* Col 2: Category Badge & Presets (Appears on click/focus) */}
                    <div className="relative" ref={techCategoryRef}>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Category Badge
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 pr-7 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary font-mono uppercase cursor-pointer"
                          placeholder="e.g. ENTERPRISE WEB & FRONTEND"
                          value={techCategory}
                          onFocus={() => setShowTechCategoryPresets(true)}
                          onClick={() => setShowTechCategoryPresets(true)}
                          onChange={(e) => {
                            setTechCategory(e.target.value);
                            setShowTechCategoryPresets(true);
                          }}
                          disabled={techFormLoading}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowTechCategoryPresets(!showTechCategoryPresets)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Toggle category presets"
                        >
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showTechCategoryPresets ? "rotate-180 text-primary" : ""}`} />
                        </button>
                      </div>

                      {showTechCategoryPresets && (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          className="absolute z-30 left-0 right-0 mt-1 p-2 bg-surface dark:bg-card border border-border/90 rounded-xl shadow-xl flex flex-wrap gap-1 max-h-48 overflow-y-auto animate-in fade-in zoom-in-95 duration-150"
                        >
                          <div className="w-full flex items-center justify-between pb-1 border-b border-border/50 text-[10px] text-muted-foreground font-semibold mb-1">
                            <span>Select category preset:</span>
                            <button
                              type="button"
                              onClick={() => setShowTechCategoryPresets(false)}
                              className="hover:text-foreground cursor-pointer px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                          {[
                            "ENTERPRISE WEB & FRONTEND",
                            "RUNTIMES & DISTRIBUTED APIS",
                            "MULTI-CLOUD ARCHITECTURE",
                            "CONTAINER PLATFORMS & CI/CD",
                            "MOBILE & CROSS-PLATFORM",
                            "AI & MACHINE LEARNING",
                            "ENTERPRISE ERP & SAP",
                          ].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setTechCategory(cat);
                                setShowTechCategoryPresets(false);
                              }}
                              className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold uppercase transition-all cursor-pointer ${
                                techCategory.toUpperCase() === cat
                                  ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-secondary"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Col 3: Status Badge & Presets (Appears on click/focus) */}
                    <div className="relative" ref={techStatusRef}>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Status Badge
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 pr-7 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary font-mono uppercase cursor-pointer"
                          placeholder="e.g. PRODUCTION READY"
                          value={techStatusBadge}
                          onFocus={() => setShowTechStatusPresets(true)}
                          onClick={() => setShowTechStatusPresets(true)}
                          onChange={(e) => {
                            setTechStatusBadge(e.target.value);
                            setShowTechStatusPresets(true);
                          }}
                          disabled={techFormLoading}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowTechStatusPresets(!showTechStatusPresets)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Toggle status presets"
                        >
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showTechStatusPresets ? "rotate-180 text-emerald-500" : ""}`} />
                        </button>
                      </div>

                      {showTechStatusPresets && (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          className="absolute z-30 left-0 right-0 mt-1 p-2 bg-surface dark:bg-card border border-border/90 rounded-xl shadow-xl flex flex-wrap gap-1 animate-in fade-in zoom-in-95 duration-150"
                        >
                          <div className="w-full flex items-center justify-between pb-1 border-b border-border/50 text-[10px] text-muted-foreground font-semibold mb-1">
                            <span>Select status preset:</span>
                            <button
                              type="button"
                              onClick={() => setShowTechStatusPresets(false)}
                              className="hover:text-foreground cursor-pointer px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                          {["PRODUCTION READY", "ENTERPRISE SCALE", "HIGH AVAILABILITY", "LATEST STABLE"].map((badge) => (
                            <button
                              key={badge}
                              type="button"
                              onClick={() => {
                                setTechStatusBadge(badge);
                                setShowTechStatusPresets(false);
                              }}
                              className={`text-[9px] px-1.5 py-0.5 rounded border font-semibold uppercase transition-all cursor-pointer ${
                                techStatusBadge.toUpperCase() === badge
                                  ? "bg-emerald-500 text-white border-emerald-600 shadow-xs"
                                  : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-secondary"
                              }`}
                            >
                              {badge}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Brand Logos Toggle Chips (Appears on click/focus) */}
                  <div className="pt-0.5 relative" ref={techBrandsRef}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <label className="text-xs font-semibold text-foreground">
                        Brand Logos / Frameworks (Comma separated)
                      </label>
                      <span className="text-[10px] text-muted-foreground">Click field to select / toggle brand chips</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 pr-7 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary cursor-pointer"
                        placeholder="e.g. React, Next.js, TypeScript"
                        value={techBrands}
                        onFocus={() => setShowTechBrandsPresets(true)}
                        onClick={() => setShowTechBrandsPresets(true)}
                        onChange={(e) => setTechBrands(e.target.value)}
                        disabled={techFormLoading}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowTechBrandsPresets(!showTechBrandsPresets)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                        title="Toggle brand logo chips"
                      >
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showTechBrandsPresets ? "rotate-180 text-primary" : ""}`} />
                      </button>
                    </div>

                    {showTechBrandsPresets && (
                      <div
                        onMouseDown={(e) => e.preventDefault()}
                        className="absolute z-30 left-0 right-0 mt-1 p-2 bg-surface dark:bg-card border border-border/90 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-150"
                      >
                        <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-border/50 text-[10px] text-muted-foreground font-semibold">
                          <span>Click chips to add/remove frameworks:</span>
                          <button
                            type="button"
                            onClick={() => setShowTechBrandsPresets(false)}
                            className="hover:text-foreground font-bold cursor-pointer px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px]"
                          >
                            Done ✓
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto p-1 bg-background rounded-lg border border-border/70">
                          {[
                            "React", "Next.js", "TypeScript", "Node.js", "Python",
                            "AWS", "Azure", "GCP", "Kubernetes", "Docker",
                            "Terraform", "Apple iOS", "Android", "Flutter",
                            "PyTorch", "TensorFlow", "OpenAI", "PostgreSQL",
                            "Redis", "SAP"
                          ].map((b) => {
                            const currentSelected = techBrands
                              .split(",")
                              .map((s) => s.trim().toLowerCase())
                              .includes(b.toLowerCase());
                            return (
                              <button
                                key={b}
                                type="button"
                                onClick={() => {
                                  const current = techBrands
                                    .split(",")
                                    .map((s) => s.trim())
                                    .filter(Boolean);
                                  const exists = current.some((c) => c.toLowerCase() === b.toLowerCase());
                                  if (exists) {
                                    setTechBrands(current.filter((c) => c.toLowerCase() !== b.toLowerCase()).join(", "));
                                  } else {
                                    setTechBrands([...current, b].join(", "));
                                  }
                                }}
                                className={`text-[9.5px] px-1.5 py-0.5 rounded font-semibold transition-all cursor-pointer border ${
                                  currentSelected
                                    ? "bg-primary text-primary-foreground border-primary shadow-2xs"
                                    : "bg-surface text-muted-foreground border-border hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                {currentSelected ? `✓ ${b}` : `+ ${b}`}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Row 3: Description & How It Works (2-column layout) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-0.5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Description <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Describe what this technology/stack is used for..."
                        value={techDesc}
                        onChange={(e) => setTechDesc(e.target.value)}
                        disabled={techFormLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        How It Works / Usage Details
                      </label>
                      <textarea
                        rows={2}
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Describe how we run or implement this technology..."
                        value={techHowToWork}
                        onChange={(e) => setTechHowToWork(e.target.value)}
                        disabled={techFormLoading}
                      />
                    </div>
                  </div>

                  {/* Action buttons (Right-aligned compact bar) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    {editingTechId !== null && (
                      <button
                        type="button"
                        onClick={handleCancelTechEdit}
                        className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                        disabled={techFormLoading}
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={techFormLoading || !techName.trim()}
                      className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                    >
                      {techFormLoading 
                        ? "Saving..." 
                        : editingTechId !== null 
                          ? "Update Technology" 
                          : "Publish Technology"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Added Technologies List NEXT (Kinda) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Current Technologies</h2>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                      {techList.length}
                    </span>
                  </div>
                  <a
                    href="/technologies"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Live Page
                  </a>
                </div>

                {techLoading && techList.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-24"></div>
                    ))}
                  </div>
                ) : techError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{techError}</p>
                  </div>
                ) : techList.length === 0 ? (
                  <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <Cpu className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No technologies yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add your first technology using the form above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {techList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-start justify-between transition-all duration-300 ${
                          editingTechId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          {/* Category & Status Badge Row */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                            {item.category && (
                              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/25">
                                {item.category}
                              </span>
                            )}
                            {item.status_badge && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                {item.status_badge}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-foreground text-base truncate">{item.name}</h4>

                          {/* Brand Logos / Names Chips */}
                          {item.brands && (
                            <div className="mt-1.5 flex flex-wrap items-center gap-1">
                              <span className="text-[10px] font-bold text-muted-foreground mr-1">Brands:</span>
                              {item.brands.split(",").map((b: string) => (
                                <span key={b} className="text-[10px] font-semibold px-2 py-0.5 bg-background text-foreground rounded-md border border-border/80">
                                  {b.trim()}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5">{item.description}</p>

                          {item.keywords && (
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.keywords.split(",").map((k: string) => (
                                <span key={k} className="text-[10px] px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded border border-border">
                                  {k.trim()}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 shrink-0 pt-1">
                          <button
                            onClick={() => handleStartTechEdit(item)}
                            className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                              editingTechId === item.id 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            }`}
                            title="Edit Technology"
                            disabled={techFormLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTech(item.id)}
                            disabled={deleteTechStatus?.id === item.id && deleteTechStatus?.status === "loading"}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                            title="Delete Technology"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              
              {/* 1. Form FIRST at the top (Paina) */}
              <div id="service-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingServiceId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {editingServiceId !== null ? "Edit Service" : "Add New Service"}
                      </h2>
                      <p className="text-[11px] text-muted-foreground">
                        {editingServiceId !== null 
                          ? "Update service card offerings and routing link." 
                          : "Configure a service card to showcase in offerings."}
                      </p>
                    </div>
                  </div>
                  {editingServiceId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelServiceEdit}
                      className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {serviceFormSuccess && (
                  <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Service {editingServiceId !== null ? "updated" : "created"} and published successfully!</span>
                  </div>
                )}

                {serviceFormError && (
                  <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{serviceFormError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitService} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                    {/* Col 1: Service Title & Target Link */}
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Service Title *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Technology Consulting"
                          value={serviceTitle}
                          onChange={(e) => setServiceTitle(e.target.value)}
                          required
                          disabled={serviceFormLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Target Link
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary font-mono"
                          placeholder="/solutions"
                          value={serviceLink}
                          onChange={(e) => setServiceLink(e.target.value)}
                          disabled={serviceFormLoading}
                        />
                      </div>
                    </div>

                    {/* Col 2: Service Icon Type & Presets (Appears on click/focus) */}
                    <div className="relative" ref={serviceIconRef}>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Service Icon Type
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 pr-7 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary font-mono cursor-pointer"
                          placeholder="e.g. tech-consulting"
                          value={serviceIcon}
                          onFocus={() => setShowServiceIconPresets(true)}
                          onClick={() => setShowServiceIconPresets(true)}
                          onChange={(e) => {
                            setServiceIcon(e.target.value);
                            setShowServiceIconPresets(true);
                          }}
                          disabled={serviceFormLoading}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowServiceIconPresets(!showServiceIconPresets)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                          title="Toggle service icon presets"
                        >
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showServiceIconPresets ? "rotate-180 text-primary" : ""}`} />
                        </button>
                      </div>

                      {showServiceIconPresets && (
                        <div
                          onMouseDown={(e) => e.preventDefault()}
                          className="absolute z-30 left-0 right-0 mt-1 p-2 bg-surface dark:bg-card border border-border/90 rounded-xl shadow-xl animate-in fade-in zoom-in-95 duration-150"
                        >
                          <div className="flex items-center justify-between pb-1 border-b border-border/50 text-[10px] text-muted-foreground font-semibold mb-1.5">
                            <span>Select service icon preset:</span>
                            <button
                              type="button"
                              onClick={() => setShowServiceIconPresets(false)}
                              className="hover:text-foreground cursor-pointer px-1 text-xs"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto">
                            {[
                              { id: "tech-consulting", label: "Tech Consulting" },
                              { id: "bpo", label: "BPO / Operations" },
                              { id: "custom-app", label: "Custom App Dev" },
                              { id: "big-data", label: "Big Data" },
                              { id: "mobile-solutions", label: "Mobile Solutions" },
                              { id: "cloud-consulting", label: "Cloud Consulting" },
                              { id: "project-implementation", label: "Implementation" },
                              { id: "staffing-solutions", label: "Staffing" },
                              { id: "ai-solutions", label: "AI & ML" },
                              { id: "cyber-security", label: "Cyber Security" },
                            ].map((iconItem) => (
                              <button
                                key={iconItem.id}
                                type="button"
                                onClick={() => {
                                  setServiceIcon(iconItem.id);
                                  setShowServiceIconPresets(false);
                                }}
                                className={`text-[9px] px-2 py-0.5 rounded border font-semibold transition-all cursor-pointer ${
                                  serviceIcon === iconItem.id
                                    ? "bg-primary text-primary-foreground border-primary shadow-xs"
                                    : "bg-background text-muted-foreground border-border hover:text-foreground hover:bg-secondary"
                                }`}
                              >
                                {iconItem.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Col 3: Description */}
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Description *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Brief summary of what this service offers..."
                        value={serviceDesc}
                        onChange={(e) => setServiceDesc(e.target.value)}
                        required
                        disabled={serviceFormLoading}
                      />
                    </div>
                  </div>

                  {/* Action buttons (Right-aligned compact bar) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    {editingServiceId !== null && (
                      <button
                        type="button"
                        onClick={handleCancelServiceEdit}
                        className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                        disabled={serviceFormLoading}
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={serviceFormLoading || !serviceTitle || !serviceDesc}
                      className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                    >
                      {serviceFormLoading 
                        ? "Saving..." 
                        : editingServiceId !== null 
                          ? "Update Service" 
                          : "Publish Service"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Added Services List NEXT (Kinda) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Current Services</h2>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                      {serviceList.length}
                    </span>
                  </div>
                </div>

                {serviceLoading && serviceList.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-24"></div>
                    ))}
                  </div>
                ) : serviceError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{serviceError}</p>
                  </div>
                ) : serviceList.length === 0 ? (
                  <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <Compass className="h-8 w-8" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No services yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add your first service using the form above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {serviceList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-start justify-between transition-all duration-300 ${
                          editingServiceId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded border border-sky-500/20">
                              {item.icon || "tech-consulting"}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {item.link || "/solutions"}
                            </span>
                          </div>

                          <h4 className="font-bold text-foreground text-base truncate">{item.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                        </div>

                        <div className="flex gap-2 shrink-0 pt-1">
                          <button
                            onClick={() => handleStartServiceEdit(item)}
                            className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                              editingServiceId === item.id 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            }`}
                            title="Edit Service"
                            disabled={serviceFormLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(item.id)}
                            disabled={deleteServiceStatus?.id === item.id && deleteServiceStatus?.status === "loading"}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === "clients" && (
            <div>
              {/* Nested Sub-tabs */}
              <div className="flex gap-6 border-b border-border/60 mb-6">
                <button
                  onClick={() => setClientSubTab("cases")}
                  className={`pb-3 text-sm font-semibold tracking-wide border-b-2 cursor-pointer transition-all ${
                    clientSubTab === "cases"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Clients & Brand Logos
                </button>
                <button
                  onClick={() => setClientSubTab("industries")}
                  className={`pb-3 text-sm font-semibold tracking-wide border-b-2 cursor-pointer transition-all ${
                    clientSubTab === "industries"
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Industries We Serve
                </button>
              </div>

              {clientSubTab === "cases" ? (
                <div className="space-y-6">
                  {/* 1. Form FIRST at the top */}
                  <div id="client-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                    <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                          {editingClientId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                            {editingClientId !== null ? "Edit Client Brand" : "Add Client Brand"}
                          </h2>
                          <p className="text-[11px] text-muted-foreground">
                            {editingClientId !== null 
                              ? "Update client brand details and logo asset." 
                              : "Add a client or partner logo to showcase on the live portal."}
                          </p>
                        </div>
                      </div>
                      {editingClientId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelClientEdit}
                          className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>

                    {clientFormSuccess && (
                      <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Client brand {editingClientId !== null ? "updated" : "added"} successfully!</span>
                      </div>
                    )}

                    {clientFormError && (
                      <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{clientFormError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmitClient} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Client / Company Name *
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            placeholder="e.g. Visa, Capital One, Apple"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                            disabled={clientFormLoading}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-foreground mb-1">
                            Industry / Category *
                          </label>
                          <select
                            className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary cursor-pointer"
                            value={clientSector}
                            onChange={(e) => setClientSector(e.target.value)}
                            required
                            disabled={clientFormLoading}
                          >
                            <option value="Banking">Banking &amp; Financial</option>
                            <option value="Technology">Technology &amp; Software</option>
                            <option value="Telecom">Telecom &amp; Networks</option>
                            <option value="Enterprise">Enterprise &amp; Logistics</option>
                            <option value="Healthcare">Healthcare &amp; Life Sciences</option>
                            <option value="Automotive">Automotive</option>
                            <option value="Insurance">Insurance</option>
                            <option value="Education">Higher Education</option>
                            {industriesList.filter(ind => !["Banking", "Technology", "Telecom", "Enterprise", "Healthcare", "Automotive", "Insurance", "Education"].includes(ind.name)).map((ind) => (
                              <option key={ind.id} value={ind.name}>
                                {ind.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <ImageUploadField
                            label="Brand Logo"
                            value={clientImage}
                            onChange={setClientImage}
                            disabled={clientFormLoading}
                            recommendedDimensions="400 × 200 px"
                            compact={true}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Partnership Notes / Summary <span className="text-[10px] text-muted-foreground font-normal">(Optional)</span>
                        </label>
                        <textarea
                          rows={2}
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                          placeholder="e.g. Enterprise technology partnership & cloud modernization collaboration."
                          value={clientDesc}
                          onChange={(e) => setClientDesc(e.target.value)}
                          disabled={clientFormLoading}
                        />
                      </div>

                      {/* Action buttons (Right-aligned compact bar) */}
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                        {editingClientId !== null && (
                          <button
                            type="button"
                            onClick={handleCancelClientEdit}
                            className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                            disabled={clientFormLoading}
                          >
                            Cancel Edit
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={clientFormLoading || !clientName.trim() || !clientSector}
                          className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                        >
                          {clientFormLoading 
                            ? "Saving..." 
                            : editingClientId !== null 
                              ? "Update Client Brand" 
                              : "Add Client Brand"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 2. Added Details List NEXT (Kindha na) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-foreground">Current Clients & Brand Logos</h2>
                        <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                          {clientList.length}
                        </span>
                      </div>
                      <a
                        href="/clients"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Live Page
                      </a>
                    </div>

                    {clientLoading && clientList.length === 0 ? (
                      <div className="space-y-4 animate-pulse">
                        {[1, 2].map((i) => (
                          <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28"></div>
                        ))}
                      </div>
                    ) : clientError ? (
                      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                        <p className="text-sm text-destructive font-medium">{clientError}</p>
                      </div>
                    ) : clientList.length === 0 ? (
                      <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                        <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                          <User className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-foreground">No client brands yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Add your first client brand name and logo using the form above.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {clientList.map((item) => (
                          <div
                            key={item.id}
                            className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                              editingClientId === item.id 
                                ? "border-primary bg-primary/2" 
                                : "border-border/85 hover:border-primary/30"
                            }`}
                          >
                            <div className="flex gap-4 items-center min-w-0">
                              <div className="h-16 w-24 rounded-xl bg-white dark:bg-white border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="max-h-12 max-w-full object-contain"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = "/logo.png";
                                    }}
                                  />
                                ) : (
                                  <Building2 className="h-6 w-6 text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                                  {item.sector}
                                </span>
                                <h4 className="font-bold text-foreground truncate mt-1">{item.name}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                              </div>
                            </div>

                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleStartClientEdit(item)}
                                className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                                  editingClientId === item.id 
                                    ? "border-primary bg-primary text-primary-foreground" 
                                    : "border-border bg-background text-foreground hover:bg-secondary"
                                }`}
                                title="Edit Client Brand"
                                disabled={clientFormLoading}
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClient(item.id)}
                                disabled={deleteClientStatus?.id === item.id && deleteClientStatus?.status === "loading"}
                                className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                                title="Delete Client Record"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 1. Form FIRST at the top */}
                  <div id="industry-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                          {editingIndustryId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </div>
                        <div>
                          <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                            {editingIndustryId !== null ? "Edit Industry" : "Add Industry"}
                          </h2>
                          <p className="text-[11px] text-muted-foreground">
                            {editingIndustryId !== null 
                              ? "Update industry vertical sector name." 
                              : "Configure an industry vertical served by our solutions."}
                          </p>
                        </div>
                      </div>
                      {editingIndustryId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelIndustryEdit}
                          className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>

                    {industryFormSuccess && (
                      <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                        <span>Industry {editingIndustryId !== null ? "updated" : "created"} successfully!</span>
                      </div>
                    )}

                    {industryFormError && (
                      <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                        <span>{industryFormError}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmitIndustry} className="flex flex-col sm:flex-row items-end gap-3">
                      <div className="flex-1 w-full">
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Industry Name *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Real Estate, Defense, Aerospace"
                          value={industryName}
                          onChange={(e) => setIndustryName(e.target.value)}
                          required
                          disabled={industryFormLoading}
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {editingIndustryId !== null && (
                          <button
                            type="button"
                            onClick={handleCancelIndustryEdit}
                            className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                            disabled={industryFormLoading}
                          >
                            Cancel Edit
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={industryFormLoading || !industryName}
                          className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                        >
                          {industryFormLoading 
                            ? "Saving..." 
                            : editingIndustryId !== null 
                              ? "Update Industry" 
                              : "Publish Industry"}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* 2. Added Details List NEXT (Kindha na) */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-foreground">Current Industries We Serve</h2>
                        <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                          {industriesList.length}
                        </span>
                      </div>
                    </div>

                    {industriesLoading && industriesList.length === 0 ? (
                      <div className="space-y-4 animate-pulse">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-20"></div>
                        ))}
                      </div>
                    ) : industriesError ? (
                      <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                        <p className="text-sm text-destructive font-medium">{industriesError}</p>
                      </div>
                    ) : industriesList.length === 0 ? (
                      <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                        <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                          <Building2 className="h-8 w-8" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-foreground">No industries yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Add your first industry using the form above.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {industriesList.map((item) => (
                          <div
                            key={item.id}
                            className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                              editingIndustryId === item.id 
                                ? "border-primary bg-primary/2" 
                                : "border-border/85 hover:border-primary/30"
                            }`}
                          >
                            <div className="min-w-0">
                              <h4 className="font-bold text-foreground truncate">{item.name}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                Created at: {new Date(item.created_at).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => handleStartIndustryEdit(item)}
                                className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                                  editingIndustryId === item.id 
                                    ? "border-primary bg-primary text-primary-foreground" 
                                    : "border-border bg-background text-foreground hover:bg-secondary"
                                }`}
                                title="Edit Industry"
                                disabled={industryFormLoading}
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteIndustry(item.id)}
                                disabled={deleteIndustryStatus?.id === item.id && deleteIndustryStatus?.status === "loading"}
                                className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                                title="Delete Industry"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "careers" && (
            <div className="space-y-6">
              
              {/* 1. Form FIRST at the top */}
              <div id="career-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingJobId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {editingJobId !== null ? "Edit Job Opening" : "Post New Job"}
                      </h2>
                      <p className="text-[11px] text-muted-foreground">
                        {editingJobId !== null 
                          ? "Update position specifications and applicant criteria." 
                          : "Publish a new career role to attract enterprise talent."}
                      </p>
                    </div>
                  </div>
                  {editingJobId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelJobEdit}
                      className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {jobFormSuccess && (
                  <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Job opening {editingJobId !== null ? "updated" : "posted"} successfully!</span>
                  </div>
                )}

                {jobFormError && (
                  <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{jobFormError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitJob} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Senior Platform Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                        disabled={jobFormLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Location *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Chennai / Hybrid, Remote"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        required
                        disabled={jobFormLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Job Type *
                      </label>
                      <select
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary cursor-pointer"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                        required
                        disabled={jobFormLoading}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Job Description
                    </label>
                    <textarea
                      rows={2}
                      className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                      placeholder="Key responsibilities, qualifications, and core technical requirements..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      disabled={jobFormLoading}
                    />
                  </div>

                  {/* Action buttons (Right-aligned compact bar) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    {editingJobId !== null && (
                      <button
                        type="button"
                        onClick={handleCancelJobEdit}
                        className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                        disabled={jobFormLoading}
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={jobFormLoading || !jobTitle || !jobLocation}
                      className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                    >
                      {jobFormLoading 
                        ? "Saving..." 
                        : editingJobId !== null 
                          ? "Update Job Opening" 
                          : "Publish Job Opening"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Added Details List NEXT (Kindha na) */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Current Job Openings</h2>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                      {jobList.length}
                    </span>
                  </div>
                  <a
                    href="/career"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <span>View Careers Page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>

                {jobLoading && jobList.length === 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28 rounded-2xl"></div>
                    ))}
                  </div>
                ) : jobError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{jobError}</p>
                  </div>
                ) : jobList.length === 0 ? (
                  <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <Briefcase className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No jobs yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Post your first job opening using the form above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {jobList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                          editingJobId === item.id 
                            ? "border-primary bg-primary/5 ring-2 ring-primary/25" 
                            : "border-border/85 hover:border-primary/40 hover:shadow-md"
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-bold text-foreground text-sm line-clamp-1">{item.title}</h4>
                            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                              {item.type}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </div>
                          {item.description && (
                            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-muted-foreground font-medium">
                            Role #{item.id}
                          </span>

                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => handleStartJobEdit(item)}
                              className={`inline-flex items-center gap-1 h-8 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                                editingJobId === item.id 
                                  ? "border-primary bg-primary text-primary-foreground" 
                                  : "border-border bg-background text-foreground hover:bg-secondary"
                              }`}
                              title="Edit Job opening"
                              disabled={jobFormLoading}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteJob(item.id)}
                              disabled={deleteJobStatus?.id === item.id && deleteJobStatus?.status === "loading"}
                              className="inline-flex items-center justify-center h-8 w-8 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 cursor-pointer"
                              title="Delete Job opening"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === "blogs" && (
            <div className="space-y-6">
              
              {/* 1. Form FIRST at the top */}
              <div id="blog-form-card" className="panel p-3.5 sm:p-4 bg-surface border border-border/80 rounded-xl shadow-xs w-full">
                <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingBlogId !== null ? <Pencil className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                        {editingBlogId !== null ? "Edit Article" : "Write Article"}
                      </h2>
                      <p className="text-[11px] text-muted-foreground">
                        {editingBlogId !== null 
                          ? "Update article copy, cover image, and structured sections." 
                          : "Publish engineering perspectives, architectures, and tech essays."}
                      </p>
                    </div>
                  </div>
                  {editingBlogId !== null && (
                    <button
                      type="button"
                      onClick={handleCancelBlogEdit}
                      className="px-2.5 py-1 rounded-lg border border-border bg-background text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                    >
                      Cancel Editing
                    </button>
                  )}
                </div>

                {blogFormSuccess && (
                  <div className="mb-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>Blog post {editingBlogId !== null ? "updated" : "published"} successfully!</span>
                  </div>
                )}

                {blogFormError && (
                  <div className="mb-3 rounded-lg bg-destructive/10 border border-destructive/30 p-2.5 text-xs text-destructive flex items-center gap-2">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    <span>{blogFormError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitBlog} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Article Title *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Strangler-fig migrations that finish"
                          value={blogTitle}
                          onChange={(e) => setBlogTitle(e.target.value)}
                          required
                          disabled={blogFormLoading}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Tag / Category *
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. Architecture, Data, AI"
                          value={blogTag}
                          onChange={(e) => setBlogTag(e.target.value)}
                          required
                          disabled={blogFormLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <ImageUploadField
                        label="Cover Image"
                        value={blogImage}
                        onChange={setBlogImage}
                        disabled={blogFormLoading}
                        recommendedDimensions="1200 × 675 px (16:9)"
                        compact={true}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Excerpt / Short Description *
                      </label>
                      <textarea
                        rows={3}
                        className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Brief summary shown in the articles feed grid..."
                        value={blogDesc}
                        onChange={(e) => setBlogDesc(e.target.value)}
                        required
                        disabled={blogFormLoading}
                      />
                    </div>
                  </div>

                  {/* Content Sections Editor */}
                  <div className="border-t border-border/60 pt-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">Structured Article Details</h3>
                        <p className="text-[10px] text-muted-foreground">Add story sections with optional headings and images.</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddBlogSection}
                        className="inline-flex items-center gap-1 rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                        disabled={blogFormLoading}
                      >
                        <Plus className="h-3 w-3" />
                        Add Section
                      </button>
                    </div>

                    <div className="space-y-2">
                      {blogSections.map((sec, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg border border-border/80 bg-background/50 space-y-2 relative">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Section #{idx + 1}</span>
                            {blogSections.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBlogSection(idx)}
                                className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                                disabled={blogFormLoading}
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-start">
                            <div>
                              <label className="block text-[11px] font-semibold text-foreground mb-0.5">
                                Section Heading (Optional)
                              </label>
                              <input
                                type="text"
                                className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                                placeholder="Heading for this block..."
                                value={sec.heading}
                                onChange={(e) => handleUpdateBlogSection(idx, "heading", e.target.value)}
                                disabled={blogFormLoading}
                              />
                            </div>

                            <div>
                              <ImageUploadField
                                label="Section Image (Optional)"
                                value={sec.image}
                                onChange={(val) => handleUpdateBlogSection(idx, "image", val)}
                                disabled={blogFormLoading}
                                compact={true}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-0.5">
                              Story / Narrative *
                            </label>
                            <textarea
                              rows={2}
                              className="w-full rounded-md border border-input bg-background px-2.5 py-1 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                              placeholder="Story paragraphs..."
                              value={sec.story}
                              onChange={(e) => handleUpdateBlogSection(idx, "story", e.target.value)}
                              required
                              disabled={blogFormLoading}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons (Right-aligned compact bar) */}
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-border/50">
                    {editingBlogId !== null && (
                      <button
                        type="button"
                        onClick={handleCancelBlogEdit}
                        className="rounded-lg border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary active:scale-98 cursor-pointer text-center"
                        disabled={blogFormLoading}
                      >
                        Cancel Edit
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={blogFormLoading || !blogTitle || !blogTag || !blogDesc}
                      className="rounded-lg bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer text-center shadow-xs disabled:opacity-50"
                    >
                      {blogFormLoading 
                        ? "Saving..." 
                        : editingBlogId !== null 
                          ? "Update Article" 
                          : "Publish Article"}
                    </button>
                  </div>
                </form>
              </div>

              {/* 2. Added Details List NEXT (Kindha na) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-foreground">Current Blog Articles</h2>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-xs font-bold">
                      {blogList.length}
                    </span>
                  </div>
                  <a
                    href="/blog"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Live Page
                  </a>
                </div>

                {blogLoading && blogList.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28 rounded-2xl"></div>
                    ))}
                  </div>
                ) : blogError ? (
                  <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                    <p className="text-sm text-destructive font-medium">{blogError}</p>
                  </div>
                ) : blogList.length === 0 ? (
                  <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                    <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">No articles published yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Write your first engineering article using the form above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {blogList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                          editingBlogId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex gap-4 items-start min-w-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/solutions-strategy.jpg";
                              }}
                              className="h-16 w-16 rounded-xl object-cover border border-border/80 shrink-0"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                              <BookOpen className="h-6 w-6" />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                              {item.tag}
                            </span>
                            <h4 className="font-bold text-foreground text-sm truncate mt-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartBlogEdit(item)}
                            className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                              editingBlogId === item.id 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            }`}
                            title="Edit Blog Post"
                            disabled={blogFormLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(item.id)}
                            disabled={deleteBlogStatus?.id === item.id && deleteBlogStatus?.status === "loading"}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                            title="Delete Blog Post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-3">
              <div className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                adminTheme === "dark" ? "bg-zinc-900/80 border-zinc-800" : "bg-white border-slate-200/90 shadow-xs"
              }`}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl font-bold text-foreground tracking-tight">Job Applications</h2>
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {applications.length} {applications.length === 1 ? "applicant" : "applicants"}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Candidates who submitted resumes & credentials for open engineering and operations roles.
                    </p>
                  </div>
                </div>
              </div>

              {applicationsLoading && applications.length === 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-56 rounded-2xl border border-border/50 bg-secondary/30"></div>
                  ))}
                </div>
              ) : applicationsError ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                  <p className="text-sm text-destructive font-medium">{applicationsError}</p>
                </div>
              ) : applications.length === 0 ? (
                <div className={`p-12 text-center border border-dashed rounded-2xl flex flex-col items-center justify-center ${
                  adminTheme === "dark" ? "border-zinc-800 bg-zinc-900/40" : "border-slate-300 bg-white"
                }`}>
                  <div className="rounded-full bg-amber-500/10 p-4 text-amber-500">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">No applications received yet</h3>
                  <p className="mt-1 text-xs text-muted-foreground max-w-sm">
                    When talent applies for positions on the Career page, their resumes and contact details will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {applications.map((appItem) => {
                    const cleanName = [appItem.first_name, appItem.last_name].filter(Boolean).join(" ") || "Candidate";
                    const initials = cleanName.split(" ").filter(Boolean).slice(0, 2).map((w: string) => w[0]?.toUpperCase()).join("") || "C";
                    const waLink = getWhatsAppLink(appItem.mobile, cleanName);

                    return (
                      <div
                        key={appItem.id}
                        className={`group relative rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-lg ${
                          adminTheme === "dark"
                            ? "bg-zinc-900/90 border-zinc-800 hover:border-amber-500/50 text-zinc-100"
                            : "bg-white border-slate-200/90 hover:border-amber-500/50 text-slate-900"
                        }`}
                      >
                        {/* Top Accent Gradient Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-transparent opacity-90" />

                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                                {initials}
                              </div>
                              <div className="min-w-0">
                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider truncate max-w-[170px]">
                                  {appItem.job_title}
                                </span>
                                <h3 className="text-base font-bold text-foreground mt-1 truncate">
                                  {cleanName}
                                </h3>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                if (window.confirm(`Delete application log for "${cleanName}"?`)) {
                                  handleDeleteApplication(appItem.id);
                                }
                              }}
                              disabled={deleteApplicationStatus?.id === appItem.id && deleteApplicationStatus?.status === "loading"}
                              className="text-muted-foreground hover:text-rose-500 p-1.5 rounded-lg border border-transparent hover:border-rose-500/20 hover:bg-rose-500/10 transition-all disabled:opacity-50 cursor-pointer shrink-0"
                              title="Delete application log"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Contact Details Interactive Chips */}
                          <div className="space-y-2 text-xs pt-3 border-t border-border/60">
                            {appItem.email && (
                              <a
                                href={`mailto:${appItem.email}?subject=Regal%20OPs%20-%20Regarding%20your%20application`}
                                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors truncate"
                                title={`Email ${appItem.email}`}
                              >
                                <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                                <span className="truncate">{appItem.email}</span>
                              </a>
                            )}
                            {appItem.mobile && (
                              <div className="flex items-center justify-between gap-2">
                                <a
                                  href={`tel:${appItem.mobile}`}
                                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                                  title={`Call ${appItem.mobile}`}
                                >
                                  <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                                  <span>{appItem.mobile}</span>
                                </a>
                                {waLink && (
                                  <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                                  >
                                    <WhatsAppIcon className="h-3 w-3 text-emerald-500" />
                                    <span>WhatsApp</span>
                                  </a>
                                )}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                              <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                              <span>Applied on {new Date(appItem.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</span>
                            </div>
                          </div>
                        </div>

                        {/* Resume Download / View Button */}
                        <div className="mt-5 pt-3 border-t border-border/60">
                          <a
                            href={appItem.cv_path ? (appItem.cv_path.startsWith('/') ? appItem.cv_path : `/${appItem.cv_path}`) : `/api/applications/${appItem.id}/resume`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-700 text-white hover:from-primary hover:to-primary/90 px-4 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer text-center"
                          >
                            <FileText className="h-4 w-4" />
                            <span>View / Download Resume (PDF)</span>
                            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
