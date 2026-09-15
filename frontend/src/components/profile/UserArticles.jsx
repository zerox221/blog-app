import { EllipsisVertical, Globe, GlobeOff, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useNavigate } from "react-router-dom";


const UserArticles = ({ article }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const description =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt perferendis sint doloribus, explicabo animi eum odit voluptatem repellendus.";
  return (
    <div
    onClick={()=>(navigate(`/dashboard/article/info/${article._id}`))}
    
    className="min-h-40 flex shrink-0 flex-col gap-3 w-full md:w-80 bg-white p-2 py-4 border border-[#DEDBD3]">
      <div className="flex justify-between text-xs">
        <span className="font-medium">{article.category}</span>
        <div className="flex gap-1 items-center text-[#706C63]">
          {article?.public ? <Globe size={15}/> : <GlobeOff size={15} /> }
          <span>{article.visibility}</span>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">{article.title}</h1>
        <div className="text-sm text-[#706C63]">
          {description.substring(0, 50)}...
        </div>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-1 items-center text-xs">
          <span className="text-[#706C63]">Likes</span>
         
          <span>{article.likes.length || 0}</span>
        </div>
        <div>
          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <ContextMenu>
              <ContextMenuTrigger>
                <EllipsisVertical size={18} />
              </ContextMenuTrigger>

              <ContextMenuContent>
                <ContextMenuItem onClick={() => navigate("/dashboard/edit/article")}>
                  Edit
                </ContextMenuItem>

                <ContextMenuItem
                  variant="destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your article.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    console.log("deleting");
                    setDeleteOpen(false);
                  }}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default UserArticles;
