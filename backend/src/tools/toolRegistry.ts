import { optimizeCuts } from './optimizeCuts';
import { estimateMaterials } from './estimateMaterials';
import { compareStoreOptions } from './compareStoreOptions';

type ToolFn = (args: any) => any;

const registry: Record<string, ToolFn> = {
  optimizeCuts: (args) => optimizeCuts(args.pieces, args.boardWidth, args.boardHeight),
  estimateMaterials: (args) => estimateMaterials(args.pieces, args.totalBoards),
  compareStoreOptions: (args) => compareStoreOptions(args.materials),
};

export function executeTool(name: string, args: any): any {
  const fn = registry[name];
  if (!fn) throw new Error(`Unknown tool: ${name}`);
  return fn(args);
}

export function getAvailableTools(): string[] {
  return Object.keys(registry);
}
