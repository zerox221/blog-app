import { Check, ImagePlus, Plus, X } from "lucide-react";
import React, { useState } from "react";
import TipTapEditor from "./TipTapEditor";
import { useForm, Controller } from "react-hook-form";
import api from "@/services/api";

import { useNavigate } from "react-router-dom";
import { fetchProfileDetails } from "@/api/blogs";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const CreateBlogForm = ({mode}) => {
  const dispatch = useDispatch();

  console.log("mode = ", mode);

  const [file, setFile] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(["TypeScript", "Architecture"]);
  const [tagInput, setTagInput] = useState("");
  

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitArticle(data) {
    if (loading) {
      return;
    }
    if (data.visibility === null) {
      data.visibility = "private";
    } else if (data.visibility === "on") {
      data.visibility = "public";
    }
    data.tags = tags;
    data.poster = file;
    const formData = new FormData();
    console.log("poseter : ", data.poster);
    formData.append("poster", data.poster);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("tags", JSON.stringify(data.tags));

    formData.append("public", data.visibility);
    setLoading(true);
    try {
      const response = await api.post("/api/v1/user/create/blog", formData);
      console.log(response);
      
      toast.success("article published successfully");
      fetchProfileDetails(dispatch);
      navigate("/dashboard");
     
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(data);
  }

  const categories = [
    "Technology",
    "Programming",
    "Web Development",
    "AI & Machine Learning",
    "Cybersecurity",
    "UI/UX Design",
    "Business",
    "Finance",
    "Career",
    "Education",
    "Productivity",
    "Lifestyle",
    "Travel",
    "Health & Fitness",
    "Science",
    "Gaming",
    "Entertainment",
    "Sports",
    "Books",
    "Reviews",
    "Personal Stories",
    "Opinion",
    "Other",
  ];

  const addTag = (event) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && tags.length < 5 && !tags.includes(newTag)) {
      setTags((currentTags) => [...currentTags, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((currentTags) => currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <form
      onSubmit={handleSubmit(submitArticle)}
      className="flex min-h-screen w-full relative flex-col gap-4 bg-white py-5 md:flex-row"
    >
      {loading && (
        <div className="opacity-30 bg-gray-50 absolute top-0 left-0 h-full w-full z-10"></div>
      )}
      {/* left side */}
      <div className="flex h-full flex-col gap-5 p-4 md:w-[60%]">
        <div className="h-56 w-full rounded-xl border border-gray-200 bg-gray-50 p-2">
          <label
            htmlFor="poster"
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-md transition hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center rounded-md bg-gray-200 p-2">
                <ImagePlus size={20} />
              </div>
              <span className="mt-3 text-sm font-semibold text-gray-800 md:text-base">
                {file ? "Change cover image" : "Add a cover image"}
              </span>
              <span className="mt-1 text-xs text-gray-500">
                Recommended: 1600 x 800 px - PNG, JPG, or WebP (Max 5MB)
              </span>
              {file && (
                <span className="mt-2 max-w-full truncate text-xs text-gray-700">
                  {file.name}
                </span>
              )}
            </div>
          </label>
          <input
            accept="image/png,image/jpeg,image/webp"
            onChange={(event) => setFile(event.target.files?.[0])}
            id="poster"
            type="file"
            className="hidden"
          />
        </div>

        <div className="space-y-4">
          <label className="block" htmlFor="article-title">
            <span className="sr-only">Article title</span>
            <input
              {...register("title")}
              id="article-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your article a clear, compelling title..."
              className="w-full border-0 border-b border-gray-200 px-0 py-3 text-2xl font-semibold text-gray-900 outline-none placeholder:text-gray-300 focus:border-gray-900 md:text-3xl"
            />
          </label>

          <label className="block" htmlFor="article-description">
            <span className="sr-only">Article description</span>
            <textarea
              {...register("description")}
              id="article-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Explain what the reader will learn in a brief excerpt (1-2 crisp sentences)..."
              rows={3}
              className="w-full resize-none border-0 border-b border-gray-200 px-0 py-2 text-sm leading-6 text-gray-700 outline-none placeholder:text-gray-400 focus:border-gray-900"
            />
          </label>
        </div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TipTapEditor value={field.value} onChange={field.onChange} />
          )}
        />
      </div>
      {/* right side */}
      <div className="flex h-full flex-col gap-4 p-4 md:w-[40%]">
        <section className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-gray-100 pb-3">
            <h1 className="text-xl font-semibold text-gray-900">
              Publishing Settings
            </h1>
            <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
              Draft
            </span>
          </div>

          <div className="space-y-5">
            <fieldset {...register("visibility")}>
              <legend className="mb-2 text-sm font-medium text-gray-700">
                Article Visibility
              </legend>
              <div className="space-y-2">
                {[
                  {
                    value: "public",
                    label: "Public",
                    description:
                      "Anyone can discover and read this article in the library.",
                  },
                  {
                    value: "private",
                    label: "Private Draft",
                    description:
                      "Only you can view, edit, and access this document.",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex cursor-pointer gap-2 rounded-md border p-3 `}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      className="mt-1 accent-black"
                    />
                    <span>
                      <span className="block text-sm font-medium text-gray-900">
                        {option.label}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {option.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="category"
            >
              Primary Category <span className="text-red-500">Required</span>
              <select
                {...register("category")}
                id="category"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700 outline-none focus:border-gray-900"
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.toLowerCase()}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-gray-700">
                <label htmlFor="tags">Topic Tags</label>
                <span className="text-xs font-normal text-gray-500">
                  Max 5 tags
                </span>
              </div>
              <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      aria-label={`Remove ${tag}`}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
                <input
                  {...register("tags")}
                  id="tags"
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  onKeyDown={addTag}
                  placeholder="Add tags (press Enter)..."
                  className="min-w-32 flex-1 py-1 text-xs outline-none"
                />
              </div>
            </div>
           {<button
              disabled={loading}
              type="submit"
              className={`w-full rounded-md bg-black ${loading ? "bg-black/35" : ""} px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800`}
            >
              {loading ? "publishing..." : "Publish Now"}
            </button>}
            <button
              type="button"
              className="w-full rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Save Draft
            </button>
          </div>
        </section>
      </div>
    </form>
  );
};

export default CreateBlogForm;
