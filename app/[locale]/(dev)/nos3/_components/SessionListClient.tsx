// RUTA: app/[locale]/(dev)/nos3/_components/SessionListClient.tsx
/**
 * @file SessionListClient.tsx
 * @description Componente de cliente para mostrar la lista de sesiones grabadas.
 * @version 1.0.0
 * @author RaZ Podestá - MetaShark Tech
 */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Button, DynamicIcon } from "@/components/ui";
import type { SessionMetadata } from "../_actions/list-sessions.action";
import { logger } from "@/shared/lib/logging";

interface SessionListClientProps {
  sessions: SessionMetadata[];
}

export function SessionListClient({
  sessions,
}: SessionListClientProps): React.ReactElement {
  logger.info("[SessionListClient] Renderizando tabla de sesiones.");
  const pathname = usePathname();

  if (sessions.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <DynamicIcon name="VideoOff" className="h-12 w-12 mx-auto mb-4" />
        <h3 className="font-semibold text-lg text-foreground">
          No hay grabaciones
        </h3>
        <p className="text-sm">Aún no se han grabado sesiones de usuario.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID de Sesión</TableHead>
          <TableHead>Fecha de Inicio</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map(({ sessionId, startTime }) => (
          <TableRow key={sessionId}>
            <TableCell className="font-mono text-xs">{sessionId}</TableCell>
            <TableCell>
              {new Date(startTime).toLocaleString("es-ES", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </TableCell>
            <TableCell className="text-right">
              <Button asChild variant="outline" size="sm">
                <Link href={`${pathname}/${sessionId}`}>
                  <DynamicIcon name="Play" className="mr-2 h-4 w-4" />
                  Reproducir
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
