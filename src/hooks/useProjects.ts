import { useState, useCallback } from 'react';
import { Project } from '../models';
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../storage/projectRepository';
import { getPiecesByProject, createPieces } from '../storage/pieceRepository';
import { getMaterialsByProject, createMaterials } from '../storage/materialRepository';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const all = await getProjects();
    setProjects(all);
    setLoading(false);
  }, []);

  const remove = useCallback(async (id: string) => {
    await deleteProject(id);
    setProjects((prev: Project[]) => prev.filter((p: Project) => p.id !== id));
  }, []);

  const rename = useCallback(async (id: string, newName: string) => {
    await updateProject(id, { name: newName });
    setProjects((prev: Project[]) => prev.map((p: Project) => (p.id === id ? { ...p, name: newName } : p)));
  }, []);

  const duplicate = useCallback(async (id: string): Promise<string | null> => {
    const original = await getProjectById(id);
    if (!original) return null;

    const newId = await createProject(
      `${original.name} (copia)`,
      original.mode,
      original.description
    );

    // Copy pieces
    const pieces = await getPiecesByProject(id);
    if (pieces.length) await createPieces(newId, pieces);

    // Copy materials
    const materials = await getMaterialsByProject(id);
    if (materials.length) await createMaterials(newId, materials);

    await refresh();
    return newId;
  }, [refresh]);

  return { projects, loading, refresh, remove, rename, duplicate };
}
