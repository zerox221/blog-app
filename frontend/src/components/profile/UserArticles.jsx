import { EllipsisVertical, Globe, GlobeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import api from "@/services/api";

import { fetchProfileDetails } from "@/api/blogs";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const UserArticles = ({ article }) => {
  const dispatch = useDispatch();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const description =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt perferendis sint doloribus, explicabo animi eum odit voluptatem repellendus.";

  const handleDelete = async () => {
    setLoading(true);
    console.log("Deleting article:", article._id);
    try {
      const response = await api.put(`/api/v1/user/delete/blog/${article._id}`);
      
      if (response.data.success) {
        fetchProfileDetails(dispatch);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setDeleteOpen(false);
  };

  return (
    <>
      <div className="min-h-40 flex shrink-0 flex-col gap-3 w-full md:w-80 bg-white p-2 py-4 border border-[#DEDBD3]">
        <div onClick={() => navigate(`/dashboard/article/info/${article._id}`)}>
          <div className="flex justify-between text-xs">
            <span className="font-medium">{article.category}</span>

            <div className="flex gap-1 items-center text-[#706C63]">
              {article?.public ? <Globe size={15} /> : <GlobeOff size={15} />}

              <span>{article.visibility}</span>
            </div>
          </div>

          <div>
            <h1 className="font-semibold">{article.title}</h1>

            <div className="text-sm text-[#706C63]">
              {description.substring(0, 50)}...
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-1 items-center text-xs">
            <span className="text-[#706C63]">Likes</span>
            <span>{article.likes?.length || 0}</span>
          </div>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline">
                    <EllipsisVertical size={15} />
                  </Button>
                }
              />

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              article and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={handleDelete}>
              {loading ? "Deleting...." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserArticles;
