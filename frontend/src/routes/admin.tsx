import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { LogOut, Trash2, Mail, Phone, Building2, Calendar, User, Inbox, RefreshCw, Plus, Image as ImageIcon, Pencil, Menu, X, Layers, Cpu, Briefcase, MapPin, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Regal OPs" },
      {
        name: "description",
        content: "Admin portal to view enquiries and manage solutions, technologies, clients, careers & blogs.",
      },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [admin, setAdmin] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"enquiries" | "solutions" | "technologies" | "clients" | "careers" | "blogs" | "applications">("enquiries");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Enquiries State
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);
  const [enquiriesError, setEnquiriesError] = useState("");
  const [deleteEnquiryStatus, setDeleteEnquiryStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Solutions State
  const [solutions, setSolutions] = useState<any[]>([]);
  const [solutionsLoading, setSolutionsLoading] = useState(true);
  const [solutionsError, setSolutionsError] = useState("");
  const [deleteSolutionStatus, setDeleteSolutionStatus] = useState<{ id: number; status: "idle" | "loading" } | null>(null);

  // Editing state for solutions
  const [editingSolId, setEditingSolId] = useState<number | null>(null);

  // Form State for new/editing solution
  const [solName, setSolName] = useState("");
  const [solImage, setSolImage] = useState("/hero-bg-1.png");
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
  const [techDesc, setTechDesc] = useState("");
  const [techFormLoading, setTechFormLoading] = useState(false);
  const [techFormSuccess, setTechFormSuccess] = useState(false);
  const [techFormError, setTechFormError] = useState("");

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
  const [clientImage, setClientImage] = useState("/hero-bg-1.png");
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
  const [blogImage, setBlogImage] = useState("/hero-bg-1.png");
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
      setSolutions(data);
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
      setTechList(data);
    } catch (err: any) {
      console.error(err);
      setTechError(err.message || "An error occurred while loading technologies.");
    } finally {
      setTechLoading(false);
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
      setClientList(data);
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
      setJobList(data);
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
      setBlogList(data);
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
      setApplications(data);
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
  };

  // Cancel Edit Mode for Solutions
  const handleCancelEdit = () => {
    setEditingSolId(null);
    setSolName("");
    setSolImage("/hero-bg-1.png");
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
    setTechDesc(item.description);
    setTechFormSuccess(false);
    setTechFormError("");
  };

  // Cancel Tech Edit Mode
  const handleCancelTechEdit = () => {
    setEditingTechId(null);
    setTechName("");
    setTechDesc("");
    setTechFormSuccess(false);
    setTechFormError("");
  };

  // Submit Technology (Create or Update)
  const handleSubmitTech = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!techName || !techDesc) return;
    
    setTechFormLoading(true);
    setTechFormError("");
    setTechFormSuccess(false);

    try {
      if (editingTechId !== null) {
        const response = await secureFetch(`/api/technologies/${editingTechId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: techName, description: techDesc }),
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
          body: JSON.stringify({ name: techName, description: techDesc }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create technology.");
        }

        const newTech = await response.json();
        setTechList((prev) => [...prev, newTech]);
        setTechName("");
        setTechDesc("");
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

  // Start Client Edit Mode
  const handleStartClientEdit = (item: any) => {
    setEditingClientId(item.id);
    setClientName(item.name);
    setClientSector(item.sector || "Banking");
    setClientImage(item.image || "");
    setClientDesc(item.description);
    setClientFormSuccess(false);
    setClientFormError("");
  };

  // Cancel Client Edit Mode
  const handleCancelClientEdit = () => {
    setEditingClientId(null);
    setClientName("");
    setClientSector("Banking");
    setClientImage("/hero-bg-1.png");
    setClientDesc("");
    setClientFormSuccess(false);
    setClientFormError("");
  };

  // Submit Client (Create or Update)
  const handleSubmitClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientSector || !clientDesc) return;
    
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
          body: JSON.stringify({ name: clientName, sector: clientSector, image: clientImage, description: clientDesc }),
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
          body: JSON.stringify({ name: clientName, sector: clientSector, image: clientImage, description: clientDesc }),
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
        setClientImage("/hero-bg-1.png");
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
    setJobFormSuccess(false);
    setJobFormError("");
  };

  // Cancel Job Edit Mode
  const handleCancelJobEdit = () => {
    setEditingJobId(null);
    setJobTitle("");
    setJobLocation("");
    setJobType("Full-time");
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
          body: JSON.stringify({ title: jobTitle, location: jobLocation, type: jobType }),
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
          body: JSON.stringify({ title: jobTitle, location: jobLocation, type: jobType }),
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
  };

  // Cancel Blog Edit Mode
  const handleCancelBlogEdit = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogTag("Architecture");
    setBlogImage("/hero-bg-1.png");
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

  // Sidebar navigation component
  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-zinc-950 text-zinc-200">
      <div>
        {/* Branding */}
        <div className="flex h-16 items-center gap-3 border-b border-border/30 px-6">
          <img src="/logo.png" className="h-10 w-auto object-contain" alt="Logo" />
          <span className="font-display text-lg font-bold tracking-tight text-white">Regal Ops Portal</span>
        </div>

        {/* Profile Card */}
        <div className="px-6 py-5 border-b border-border/20">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">Logged In As</p>
          <h4 className="mt-1 font-semibold text-white truncate">{admin.name}</h4>
          <p className="text-xs text-zinc-400 truncate">{admin.email}</p>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          <button
            onClick={() => {
              setActiveTab("enquiries");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "enquiries"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <Inbox className="h-4.5 w-4.5" />
            Enquiries
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "enquiries" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("solutions");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "solutions"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <Layers className="h-4.5 w-4.5" />
            Manage Solutions
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "solutions" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {solutions.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("technologies");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "technologies"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <Cpu className="h-4.5 w-4.5" />
            Manage Technologies
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "technologies" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {techList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("clients");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "clients"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <User className="h-4.5 w-4.5" />
            Manage Clients
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "clients" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {clientList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("careers");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "careers"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <Briefcase className="h-4.5 w-4.5" />
            Manage Careers
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "careers" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {jobList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("blogs");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "blogs"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <BookOpen className="h-4.5 w-4.5" />
            Manage Blogs
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "blogs" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {blogList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("applications");
              setMobileSidebarOpen(false);
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all cursor-pointer ${
              activeTab === "applications"
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-zinc-800/60 hover:text-white text-zinc-400"
            }`}
          >
            <Inbox className="h-4.5 w-4.5" />
            Applications
            <span className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
              activeTab === "applications" ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
            }`}>
              {applications.length}
            </span>
          </button>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-border/20">
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
    <div className="flex min-h-screen bg-background">
      
      {/* 1. Desktop Sidebar (Left) */}
      <aside className="hidden w-64 shrink-0 border-r border-border/70 xl:block">
        <SidebarContent />
      </aside>

      {/* 2. Mobile Sidebar Overlay & Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex w-64 max-w-xs flex-col border-r border-border bg-background animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute right-4 top-4 rounded-xl border border-border p-1.5 text-muted-foreground bg-background"
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
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/70 bg-background/85 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="rounded-xl border border-border p-2 text-foreground xl:hidden"
              aria-label="Open sidebar menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-bold text-foreground">
              {activeTab === "enquiries" 
                ? "Contact Enquiries" 
                : activeTab === "solutions"
                  ? "Manage Solutions"
                  : activeTab === "technologies"
                    ? "Manage Technologies"
                    : activeTab === "clients"
                      ? "Manage Clients"
                      : activeTab === "careers"
                        ? "Manage Careers"
                        : "Manage Blogs"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                fetchEnquiries();
                fetchSolutions();
                fetchTechnologies();
                fetchClients();
                fetchJobs();
                fetchBlogs();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-semibold text-foreground transition-all hover:bg-secondary"
              title="Refresh Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${enquiriesLoading || solutionsLoading || techLoading || clientLoading || jobLoading || blogLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>
        </header>

        {/* Main Panel Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          
          {/* Stat Metrics Grid */}
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 mb-8">
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Enquiries
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {enquiriesLoading ? "..." : enquiries.length}
              </h3>
            </div>
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Solutions
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {solutionsLoading ? "..." : solutions.length}
              </h3>
            </div>
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Tech Stack
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {techLoading ? "..." : techList.length}
              </h3>
            </div>
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Clients
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {clientLoading ? "..." : clientList.length}
              </h3>
            </div>
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Careers
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {jobLoading ? "..." : jobList.length}
              </h3>
            </div>
            <div className="panel p-4 bg-surface border border-border/70">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                Blogs
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-foreground">
                {blogLoading ? "..." : blogList.length}
              </h3>
            </div>
          </div>

          {/* Active Tab Panel Rendering */}
          {activeTab === "enquiries" && (
            <div>
              {enquiriesLoading && enquiries.length === 0 ? (
                <div className="grid gap-4 md:grid-cols-2 animate-pulse">
                  {[1, 2].map((i) => (
                    <div key={i} className="panel p-6 bg-surface-2 border border-border/50 h-52"></div>
                  ))}
                </div>
              ) : enquiriesError ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                  <p className="text-sm text-destructive font-medium">{enquiriesError}</p>
                </div>
              ) : enquiries.length === 0 ? (
                <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl flex flex-col items-center justify-center">
                  <div className="rounded-full bg-secondary p-3 text-muted-foreground">
                    <Inbox className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">No enquiries yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submissions from the website's contact form will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {enquiries.map((item) => (
                    <div
                      key={item.id}
                      className="panel p-6 bg-surface border border-border/85 flex flex-col justify-between transition-all hover:border-primary/40 duration-300"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-secondary p-1.5 text-primary">
                              <User className="h-4 w-4" />
                            </div>
                            <h4 className="font-bold text-foreground">{item.first_name} {item.last_name}</h4>
                          </div>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(item.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2 border-b border-border/50 pb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-primary/70" />
                            <a href={`mailto:${item.email}`} className="hover:text-primary transition-colors">
                              {item.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary/70" />
                            <a href={`tel:${item.mobile}`} className="hover:text-primary transition-colors">
                              {item.mobile}
                            </a>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-primary/70 mt-0.5" />
                            <span>
                              {[item.city, item.state, item.country, item.zip_code].filter(Boolean).join(", ") || "N/A"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary/70" />
                            <span className="font-semibold text-primary uppercase text-[10px] tracking-wider bg-primary/10 px-2 py-0.5 rounded-full">
                              {item.service}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                            Additional Comments
                          </h5>
                          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap bg-secondary/30 p-3.5 rounded-xl border border-border/40">
                            {item.comments}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => handleDeleteEnquiry(item.id)}
                          disabled={deleteEnquiryStatus?.id === item.id && deleteEnquiryStatus?.status === "loading"}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-2 text-xs font-semibold text-destructive transition-all hover:bg-destructive hover:text-white disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deleteEnquiryStatus?.id === item.id && deleteEnquiryStatus?.status === "loading"
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "solutions" && (
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              
              {/* Left Column: Solutions List */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Current Solutions</h2>

                {solutionsLoading && solutions.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28"></div>
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
                      Create your first solution using the form on the right.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {solutions.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                          editingSolId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex gap-4 items-center min-w-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-16 w-16 rounded-xl object-cover border border-border/80 shrink-0"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                              <ImageIcon className="h-6 w-6" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                              editingSolId === item.id 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            }`}
                            title="Edit Solution"
                            disabled={formLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSolution(item.id)}
                            disabled={deleteSolutionStatus?.id === item.id && deleteSolutionStatus?.status === "loading"}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                            title="Delete Solution"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Creation / Editing Form */}
              <div>
                <div className="panel p-6 bg-surface border border-border/80 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingSolId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {editingSolId !== null ? "Edit Solution" : "Add New Solution"}
                    </h2>
                  </div>

                  {formSuccess && (
                    <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                      Solution {editingSolId !== null ? "updated" : "created"} and published successfully!
                    </div>
                  )}

                  {formError && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                      {formError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitSolution} className="space-y-5">
                    <label className="block text-sm font-medium">
                      Solution Name
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Artificial Intelligence Consulting"
                        value={solName}
                        onChange={(e) => setSolName(e.target.value)}
                        required
                        disabled={formLoading}
                      />
                    </label>

                    <div>
                      <label className="block text-sm font-medium">
                        Image URL / Path
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. /hero-bg-1.png or external link"
                          value={solImage}
                          onChange={(e) => setSolImage(e.target.value)}
                          disabled={formLoading}
                        />
                      </label>
                      <div className="mt-2.5">
                        <span className="text-xs text-muted-foreground block mb-1">Preset Abstract Images:</span>
                        <div className="flex gap-2">
                          {["/hero-bg-1.png", "/hero-bg-2.png", "/hero-bg-3.png"].map((img, idx) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => setSolImage(img)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                solImage === img
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "bg-background border-border text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              Image {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="block text-sm font-medium">
                      Description
                      <textarea
                        rows={4}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Describe what this solution entails..."
                        value={solDesc}
                        onChange={(e) => setSolDesc(e.target.value)}
                        required
                        disabled={formLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Core Capabilities (One per line)
                      <textarea
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Domain-Driven Development (DDD)&#10;High-throughput event-driven microservices"
                        value={solCapabilities}
                        onChange={(e) => setSolCapabilities(e.target.value)}
                        disabled={formLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Delivery Methodology Phases (One per line)
                      <textarea
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Discovery & Event Storming&#10;Target Architecture Blueprinting"
                        value={solMethodology}
                        onChange={(e) => setSolMethodology(e.target.value)}
                        disabled={formLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Key Deliverables (One per line)
                      <textarea
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Fully documented OpenAPI specifications&#10;Automated integration test suites"
                        value={solDeliverables}
                        onChange={(e) => setSolDeliverables(e.target.value)}
                        disabled={formLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Featured Technologies (One per line)
                      <textarea
                        rows={2}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Node.js&#10;TypeScript&#10;Go"
                        value={solTechnologies}
                        onChange={(e) => setSolTechnologies(e.target.value)}
                        disabled={formLoading}
                      />
                    </label>

                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={formLoading || !solName || !solDesc}
                        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                      >
                        {formLoading 
                          ? "Saving Solution..." 
                          : editingSolId !== null 
                            ? "Update Solution" 
                            : "Publish Solution"}
                      </button>
                      {editingSolId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                          disabled={formLoading}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )}

          {activeTab === "technologies" && (
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              
              {/* Left Column: Technologies List */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Current Technologies</h2>

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
                      Add your first technology using the form on the right.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {techList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                          editingTechId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                        </div>

                        <div className="flex gap-2 shrink-0">
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

              {/* Right Column: Creation / Editing Form */}
              <div>
                <div className="panel p-6 bg-surface border border-border/80 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingTechId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {editingTechId !== null ? "Edit Technology" : "Add New Technology"}
                    </h2>
                  </div>

                  {techFormSuccess && (
                    <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                      Technology {editingTechId !== null ? "updated" : "created"} and published successfully!
                    </div>
                  )}

                  {techFormError && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                      {techFormError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitTech} className="space-y-5">
                    <label className="block text-sm font-medium">
                      Technology Name
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. React Native / Swift"
                        value={techName}
                        onChange={(e) => setTechName(e.target.value)}
                        required
                        disabled={techFormLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Description
                      <textarea
                        rows={4}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Describe what this technology/stack is used for..."
                        value={techDesc}
                        onChange={(e) => setTechDesc(e.target.value)}
                        required
                        disabled={techFormLoading}
                      />
                    </label>

                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={techFormLoading || !techName || !techDesc}
                        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                      >
                        {techFormLoading 
                          ? "Saving..." 
                          : editingTechId !== null 
                            ? "Update Technology" 
                            : "Publish Technology"}
                      </button>
                      {editingTechId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelTechEdit}
                          className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                          disabled={techFormLoading}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
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
                  Case Studies
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
                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                  {/* Left Column: Clients List */}
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-4">Current Clients & Case Studies</h2>

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
                        <h3 className="mt-4 text-base font-semibold text-foreground">No case studies yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Create your first client record using the form on the right.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
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
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-16 w-16 rounded-xl object-cover border border-border/80 shrink-0"
                                />
                              ) : (
                                <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                                  <ImageIcon className="h-6 w-6" />
                                </div>
                              )}
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
                                title="Edit Client Case Study"
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

                  {/* Right Column: Creation / Editing Form */}
                  <div>
                    <div className="panel p-6 bg-surface border border-border/80 sticky top-24">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                          {editingClientId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                          {editingClientId !== null ? "Edit Client Study" : "Add Client Study"}
                        </h2>
                      </div>

                      {clientFormSuccess && (
                        <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                          Client case study {editingClientId !== null ? "updated" : "created"} successfully!
                        </div>
                      )}

                      {clientFormError && (
                        <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                          {clientFormError}
                        </div>
                      )}

                      <form onSubmit={handleSubmitClient} className="space-y-5">
                        <label className="block text-sm font-medium">
                          Case Title / Client Name
                          <input
                            type="text"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            placeholder="e.g. Core replatform, zero customer outage"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                            disabled={clientFormLoading}
                          />
                        </label>

                        <label className="block text-sm font-medium">
                          Sector / Industry
                          <select
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary cursor-pointer"
                            value={clientSector}
                            onChange={(e) => setClientSector(e.target.value)}
                            required
                            disabled={clientFormLoading}
                          >
                            <option value="">Select an industry...</option>
                            {industriesList.map((ind) => (
                              <option key={ind.id} value={ind.name}>
                                {ind.name}
                              </option>
                            ))}
                          </select>
                        </label>

                        <div>
                          <label className="block text-sm font-medium">
                            Cover Image URL
                            <input
                              type="text"
                              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                              placeholder="e.g. /hero-bg-1.png or external link"
                              value={clientImage}
                              onChange={(e) => setClientImage(e.target.value)}
                              disabled={clientFormLoading}
                            />
                          </label>
                          <div className="mt-2.5">
                            <span className="text-xs text-muted-foreground block mb-1">Preset Abstract Images:</span>
                            <div className="flex gap-2">
                              {["/hero-bg-1.png", "/hero-bg-2.png", "/hero-bg-3.png"].map((img, idx) => (
                                <button
                                  key={img}
                                  type="button"
                                  onClick={() => setClientImage(img)}
                                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                    clientImage === img
                                      ? "bg-primary border-primary text-primary-foreground"
                                      : "bg-background border-border text-muted-foreground hover:text-foreground"
                                  }`}
                                >
                                  Image {idx + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <label className="block text-sm font-medium">
                          Description / Results Summary
                          <textarea
                            rows={4}
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                            placeholder="Detail the case results, e.g. 14-year-old monolith split into..."
                            value={clientDesc}
                            onChange={(e) => setClientDesc(e.target.value)}
                            required
                            disabled={clientFormLoading}
                          />
                        </label>

                        <div className="space-y-2">
                          <button
                            type="submit"
                            disabled={clientFormLoading || !clientName || !clientSector || !clientDesc}
                            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                          >
                            {clientFormLoading 
                              ? "Saving..." 
                              : editingClientId !== null 
                                ? "Update Case Study" 
                                : "Publish Case Study"}
                          </button>
                          {editingClientId !== null && (
                            <button
                              type="button"
                              onClick={handleCancelClientEdit}
                              className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                              disabled={clientFormLoading}
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
                  {/* Left Column: Industries List */}
                  <div>
                    <h2 className="text-lg font-bold text-foreground mb-4">Current Industries We Serve</h2>

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
                          Add your first industry using the form on the right.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
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

                  {/* Right Column: Industry Creation Form */}
                  <div>
                    <div className="panel p-6 bg-surface border border-border/80 sticky top-24">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                          {editingIndustryId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                          {editingIndustryId !== null ? "Edit Industry" : "Add Industry"}
                        </h2>
                      </div>

                      {industryFormSuccess && (
                        <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                          Industry {editingIndustryId !== null ? "updated" : "created"} successfully!
                        </div>
                      )}

                      {industryFormError && (
                        <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                          {industryFormError}
                        </div>
                      )}

                      <form onSubmit={handleSubmitIndustry} className="space-y-5">
                        <label className="block text-sm font-medium">
                          Industry Name
                          <input
                            type="text"
                            className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            placeholder="e.g. Real Estate, Defense"
                            value={industryName}
                            onChange={(e) => setIndustryName(e.target.value)}
                            required
                            disabled={industryFormLoading}
                          />
                        </label>

                        <div className="space-y-2">
                          <button
                            type="submit"
                            disabled={industryFormLoading || !industryName}
                            className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                          >
                            {industryFormLoading 
                              ? "Saving..." 
                              : editingIndustryId !== null 
                                ? "Update Industry" 
                                : "Publish Industry"}
                          </button>
                          {editingIndustryId !== null && (
                            <button
                              type="button"
                              onClick={handleCancelIndustryEdit}
                              className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                              disabled={industryFormLoading}
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "careers" && (
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              
              {/* Left Column: Jobs List */}
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4">Current Job Openings</h2>

                {jobLoading && jobList.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-24"></div>
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
                      Post your first job opening using the form on the right.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                          editingJobId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-foreground truncate">{item.title}</h4>
                          <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-primary" /> {item.location}
                            </span>
                            <span className="font-semibold text-primary">
                              • {item.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleStartJobEdit(item)}
                            className={`inline-flex items-center justify-center h-9 w-9 rounded-xl border transition-all shrink-0 cursor-pointer ${
                              editingJobId === item.id 
                                ? "border-primary bg-primary text-primary-foreground" 
                                : "border-border bg-background text-foreground hover:bg-secondary"
                            }`}
                            title="Edit Job opening"
                            disabled={jobFormLoading}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(item.id)}
                            disabled={deleteJobStatus?.id === item.id && deleteJobStatus?.status === "loading"}
                            className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive hover:bg-destructive hover:text-white transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                            title="Delete Job opening"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Creation / Editing Form */}
              <div>
                <div className="panel p-6 bg-surface border border-border/80 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingJobId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {editingJobId !== null ? "Edit Job opening" : "Post New Job"}
                    </h2>
                  </div>

                  {jobFormSuccess && (
                    <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                      Job opening {editingJobId !== null ? "updated" : "posted"} successfully!
                    </div>
                  )}

                  {jobFormError && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                      {jobFormError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitJob} className="space-y-5">
                    <label className="block text-sm font-medium">
                      Job Title
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Senior Platform Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                        disabled={jobFormLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Location
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Chennai / Hybrid, Remote"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        required
                        disabled={jobFormLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Job Type
                      <select
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
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
                    </label>

                    <div className="space-y-2">
                      <button
                        type="submit"
                        disabled={jobFormLoading || !jobTitle || !jobLocation}
                        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                      >
                        {jobFormLoading 
                          ? "Saving..." 
                          : editingJobId !== null 
                            ? "Update Job Opening" 
                            : "Publish Job Opening"}
                      </button>
                      {editingJobId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelJobEdit}
                          className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                          disabled={jobFormLoading}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )}

          {activeTab === "blogs" && (
            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              
              {/* Left Column: Blogs List */}
              <div className="max-h-[80vh] overflow-y-auto pr-2">
                <h2 className="text-lg font-bold text-foreground mb-4">Current Blog Articles</h2>

                {blogLoading && blogList.length === 0 ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2].map((i) => (
                      <div key={i} className="panel p-4 bg-surface-2 border border-border/50 h-28 animate-pulse"></div>
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
                      Write your first engineering article using the form on the right.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {blogList.map((item) => (
                      <div
                        key={item.id}
                        className={`panel p-4 bg-surface border flex gap-4 items-center justify-between transition-all duration-300 ${
                          editingBlogId === item.id 
                            ? "border-primary bg-primary/2" 
                            : "border-border/85 hover:border-primary/30"
                        }`}
                      >
                        <div className="flex gap-4 items-center min-w-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-16 w-16 rounded-xl object-cover border border-border/80 shrink-0"
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0">
                              <BookOpen className="h-6 w-6" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                              {item.tag}
                            </span>
                            <h4 className="font-bold text-foreground truncate mt-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
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

              {/* Right Column: Creation / Editing Form */}
              <div className="max-h-[80vh] overflow-y-auto pr-2">
                <div className="panel p-6 bg-surface border border-border/80">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
                      {editingBlogId !== null ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      {editingBlogId !== null ? "Edit Article" : "Write Article"}
                    </h2>
                  </div>

                  {blogFormSuccess && (
                    <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-sm text-emerald-600">
                      Blog post {editingBlogId !== null ? "updated" : "published"} successfully!
                    </div>
                  )}

                  {blogFormError && (
                    <div className="mb-4 rounded-xl bg-destructive/10 border border-destructive/30 p-4 text-sm text-destructive">
                      {blogFormError}
                    </div>
                  )}

                  <form onSubmit={handleSubmitBlog} className="space-y-5">
                    <label className="block text-sm font-medium">
                      Article Title
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Strangler-fig migrations that finish"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                        disabled={blogFormLoading}
                      />
                    </label>

                    <label className="block text-sm font-medium">
                      Tag / Category
                      <input
                        type="text"
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        placeholder="e.g. Architecture, Data, AI"
                        value={blogTag}
                        onChange={(e) => setBlogTag(e.target.value)}
                        required
                        disabled={blogFormLoading}
                      />
                    </label>

                    <div>
                      <label className="block text-sm font-medium">
                        Cover Image URL
                        <input
                          type="text"
                          className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                          placeholder="e.g. /hero-bg-1.png or external link"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          disabled={blogFormLoading}
                        />
                      </label>
                      <div className="mt-2.5">
                        <span className="text-xs text-muted-foreground block mb-1">Preset Abstract Images:</span>
                        <div className="flex gap-2">
                          {["/hero-bg-1.png", "/hero-bg-2.png", "/hero-bg-3.png"].map((img, idx) => (
                            <button
                              key={img}
                              type="button"
                              onClick={() => setBlogImage(img)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                                blogImage === img
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "bg-background border-border text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              Image {idx + 1}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <label className="block text-sm font-medium">
                      Excerpt / Short Description
                      <textarea
                        rows={3}
                        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                        placeholder="Brief summary shown in the articles feed grid..."
                        value={blogDesc}
                        onChange={(e) => setBlogDesc(e.target.value)}
                        required
                        disabled={blogFormLoading}
                      />
                    </label>

                    {/* Content Sections Editor */}
                    <div className="border-t border-border/60 pt-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-foreground">Structured Article Details</h3>
                        <button
                          type="button"
                          onClick={handleAddBlogSection}
                          className="inline-flex items-center gap-1 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                          disabled={blogFormLoading}
                        >
                          <Plus className="h-3 w-3" />
                          Add Section
                        </button>
                      </div>

                      <div className="space-y-6">
                        {blogSections.map((sec, idx) => (
                          <div key={idx} className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-3 relative">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground uppercase">Section #{idx + 1}</span>
                              {blogSections.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBlogSection(idx)}
                                  className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
                                  disabled={blogFormLoading}
                                >
                                  Remove
                                </button>
                              )}
                            </div>

                            <label className="block text-xs font-medium">
                              Section Heading (Optional)
                              <input
                                type="text"
                                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                                placeholder="Heading for this block..."
                                value={sec.heading}
                                onChange={(e) => handleUpdateBlogSection(idx, "heading", e.target.value)}
                                disabled={blogFormLoading}
                              />
                            </label>

                            <div>
                              <label className="block text-xs font-medium">
                                Section Image URL (Optional)
                                <input
                                  type="text"
                                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                                  placeholder="Cover image for this block..."
                                  value={sec.image}
                                  onChange={(e) => handleUpdateBlogSection(idx, "image", e.target.value)}
                                  disabled={blogFormLoading}
                                />
                              </label>
                              <div className="mt-1.5 flex gap-1.5">
                                {["/hero-bg-1.png", "/hero-bg-2.png", "/hero-bg-3.png"].map((img, i) => (
                                  <button
                                    key={img}
                                    type="button"
                                    onClick={() => handleUpdateBlogSection(idx, "image", img)}
                                    className={`px-2 py-1 text-[10px] rounded border transition-all cursor-pointer ${
                                      sec.image === img
                                        ? "bg-primary border-primary text-primary-foreground"
                                        : "bg-background border-border text-muted-foreground hover:text-foreground"
                                    }`}
                                  >
                                    Img {i + 1}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <label className="block text-xs font-medium">
                              Story / Story Text
                              <textarea
                                rows={4}
                                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none transition-all placeholder:text-muted-foreground focus:border-primary resize-none"
                                placeholder="Story paragraphs..."
                                value={sec.story}
                                onChange={(e) => handleUpdateBlogSection(idx, "story", e.target.value)}
                                required
                                disabled={blogFormLoading}
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-border/60 pt-5">
                      <button
                        type="submit"
                        disabled={blogFormLoading || !blogTitle || !blogTag || !blogDesc}
                        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer text-center"
                      >
                        {blogFormLoading 
                          ? "Saving..." 
                          : editingBlogId !== null 
                            ? "Update Article" 
                            : "Publish Article"}
                      </button>
                      {editingBlogId !== null && (
                        <button
                          type="button"
                          onClick={handleCancelBlogEdit}
                          className="w-full rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary active:scale-98 cursor-pointer text-center"
                          disabled={blogFormLoading}
                        >
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

            </div>
          )}

          {activeTab === "applications" && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">Job Applications</h2>

              {applicationsLoading && applications.length === 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-pulse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="panel h-48 bg-surface-2 border border-border/50 rounded-2xl"></div>
                  ))}
                </div>
              ) : applicationsError ? (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center">
                  <p className="text-sm text-destructive font-medium">{applicationsError}</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="panel p-12 text-center border border-dashed border-border/80 rounded-2xl">
                  <Inbox className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="mt-4 text-base font-semibold text-foreground">No applications yet</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Candidates applying for open roles will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {applications.map((appItem) => (
                    <div key={appItem.id} className="panel p-5 bg-surface border border-border flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold text-primary uppercase">
                              {appItem.job_title}
                            </span>
                            <h3 className="text-base font-bold text-foreground mt-2">
                              {appItem.first_name} {appItem.last_name}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleDeleteApplication(appItem.id)}
                            disabled={deleteApplicationStatus?.id === appItem.id && deleteApplicationStatus.status === "loading"}
                            className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 cursor-pointer"
                            title="Delete application log"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>

                        <div className="space-y-1.5 text-xs text-muted-foreground pt-1 border-t border-border/50">
                          <p className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5" /> {appItem.email}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" /> {appItem.mobile}
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" /> {new Date(appItem.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-border/50">
                        <a
                          href={`${appItem.cv_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2.5 text-xs font-semibold transition-colors cursor-pointer text-center"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          View PDF Resume / CV
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

    </div>
  );
}
