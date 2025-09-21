// components/sections/comments/CommentList.tsx
/**
 * @file CommentList.tsx
 * @description Componente de presentación para renderizar una lista de comentarios.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { DynamicIcon } from "@/components/ui";
import type { Comment } from "@/shared/lib/schemas/community/comment.schema";
import { logger } from "@/shared/lib/logging";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  logger.trace("[CommentList] Renderizando.");

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aún no hay comentarios. ¡Sé el primero en participar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.commentId}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-start space-x-4"
          >
            <Avatar>
              <AvatarImage src={comment.authorAvatarUrl ?? undefined} />
              <AvatarFallback>
                <DynamicIcon name="User" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold text-foreground">{comment.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                {comment.commentText}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
// components/sections/comments/CommentList.tsx
