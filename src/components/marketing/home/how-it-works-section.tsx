"use client";

import * as React from "react";
import {
  Background,
  BaseEdge,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  getSmoothStepPath,
  type Edge,
  type EdgeProps,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, type Variants } from "framer-motion";
import {
  BriefcaseBusiness,
  FileText,
  Mic,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const smoothEase = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: smoothEase },
  },
};

type StepData = {
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: "primary" | "emerald" | "amber";
};

const stepCards: StepData[] = [
  {
    step: "01",
    title: "Paste the job description",
    description:
      "Start with the exact role you are preparing for. The AI reads the description and generates questions matched to the role and seniority.",
    icon: FileText,
    // accent: "primary",
  },
  {
    step: "02",
    title: "Choose interview style",
    description:
      "Pick behavioral, technical, case, or culture fit. Adjust difficulty, rounds, and coaching focus for the role.",
    icon: BriefcaseBusiness,
    // accent: "amber",
  },
  {
    step: "03",
    title: "Practice with voice",
    description:
      "Answer out loud in a realistic mock session. The AI listens, transcribes, and evaluates your delivery in real time.",
    icon: Mic,
    accent: "emerald",
  },
  {
    step: "04",
    title: "Review the feedback",
    description:
      "See scores for clarity, structure, and confidence, with specific notes that sharpen every answer.",
    icon: Sparkles,
    accent: "primary",
  },
];

function getAccentClasses(accent: StepData["accent"]) {
  switch (accent) {
    case "emerald":
      return {
        iconWrap: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        edge: "#22c55e",
      };
    case "amber":
      return {
        iconWrap: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        edge: "#f59e0b",
      };
    default:
      return {
        iconWrap: "bg-primary/10 text-primary",
        edge: "oklch(0.55 0.2 290)",
      };
  }
}

function WaveBars() {
  const bars = [16, 26, 18, 30, 20, 28, 14];
  return (
    <div className="mt-5 flex items-end gap-1.5">
      {bars.map((height, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full bg-primary/70"
          style={{ height }}
          animate={{
            scaleY: [0.55, 1, 0.65, 1],
            opacity: [0.45, 1, 0.6, 0.9],
          }}
          transition={{
            duration: 1.05 + i * 0.07,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
}

function StepNode({ data }: NodeProps<Node<StepData>>) {
  const Icon = data.icon;
  const accent = getAccentClasses(data.accent);

  return (
    <div
      className={cn(
        "group relative w-[290px] overflow-hidden rounded-[1.9rem] border border-border/60 bg-card/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !border-2 !border-background !bg-primary/80"
      />

      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !border-2 !border-background !bg-primary/80"
      />

      <div className="flex items-start justify-between gap-4">
        <motion.div
          className={cn(
            "flex size-12 items-center justify-center rounded-2xl",
            accent.iconWrap
          )}
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(0,0,0,0)",
              "0 0 0 10px rgba(0,0,0,0)",
            ],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Icon className="size-5" />
        </motion.div>

        <span className="font-mono text-sm font-medium text-muted-foreground/50">
          {data.step}
        </span>
      </div>

      <h3 className="mt-7 font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
        {data.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {data.description}
      </p>

      {/* {data.title === "Practice with voice" ? (
        <WaveBars />
      ) : (
        <motion.div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            animate={{ width: ["18%", "82%", "42%"] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )} */}
    </div>
  );
}

function AnimatedFlowEdge(props: EdgeProps) {
  const [edgePath] = getSmoothStepPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
    borderRadius: 20,
  });

  const color = props.style?.stroke ?? "var(--primary)";

  return (
    <>
      <BaseEdge
        id={props.id}
        path={edgePath}
        style={{
          stroke: color as string,
          strokeWidth: 2,
          opacity: 0.28,
        }}
      />
      <circle r="5" fill={color as string}>
        <animateMotion dur="2.6s" repeatCount="indefinite" path={edgePath} />
      </circle>
    </>
  );
}

const nodeTypes = {
  stepCard: StepNode,
};

const edgeTypes = {
  animatedFlow: AnimatedFlowEdge,
};

const initialNodes: Node<StepData>[] = [
  {
    id: "1",
    type: "stepCard",
    position: { x: 0, y: 50 },
    data: stepCards[0],
    draggable: false,
    selectable: false,
  },
  {
    id: "2",
    type: "stepCard",
    position: { x: 360, y: 0 },
    data: stepCards[1],
    draggable: false,
    selectable: false,
  },
  {
    id: "3",
    type: "stepCard",
    position: { x: 720, y: 90 },
    data: stepCards[2],
    draggable: false,
    selectable: false,
  },
  {
    id: "4",
    type: "stepCard",
    position: { x: 1080, y: 20 },
    data: stepCards[3],
    draggable: false,
    selectable: false,
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "animatedFlow",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "var(--primary)" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "animatedFlow",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#f59e0b" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "animatedFlow",
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#22c55e" },
  },
];

function HowItWorksFlow() {
  return (
    <div className="relative mt-12 overflow-hidden">
      <div className="h-[340px] w-full rounded-[1.5rem] ">
        <ReactFlow
  nodes={initialNodes}
  edges={initialEdges}
  nodeTypes={nodeTypes}
  edgeTypes={edgeTypes}
  fitView
  fitViewOptions={{ padding: 0.14 }}
  nodesDraggable={false}
  nodesConnectable={false}
  elementsSelectable={false}
  nodesFocusable={false}
  edgesFocusable={false}
  zoomOnScroll={false}
  zoomOnPinch={false}
  zoomOnDoubleClick={false}
  panOnDrag={false}
  panOnScroll={false}
  selectionOnDrag={false}
  preventScrolling={false}
  proOptions={{ hideAttribution: true }}
  className="rounded-[1.5rem]"
>
  <Background
    gap={28}
    size={1}
    color="color-mix(in oklch, var(--border) 55%, transparent)"
  />
</ReactFlow>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--primary)_8%,transparent),transparent_72%)]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div
            variants={itemVariants}
            className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
          >
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                How it works
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-foreground sm:text-5xl md:text-6xl">
                Practice in a flow that mirrors the real interview.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Move from role-specific setup to live voice rehearsal and clear
                feedback — all in one focused preparation loop.
              </p>
            </div>

            <div className="hidden md:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/75">
                Guided workflow · repeated practice
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ReactFlowProvider>
              <HowItWorksFlow />
            </ReactFlowProvider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}