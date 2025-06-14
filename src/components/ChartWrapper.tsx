import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Enhanced chart components that explicitly handle props to avoid defaultProps warnings
interface ChartAxisProps {
  dataKey?: string;
  stroke?: string;
  fontSize?: number;
  tickLine?: boolean;
  axisLine?: boolean;
  domain?: any;
  tick?: any;
}

const EnhancedXAxis: React.FC<ChartAxisProps> = ({
  dataKey = "date",
  stroke = "#86868b",
  fontSize = 12,
  tickLine = false,
  axisLine = false,
  tick = { fontSize: 12, fill: "#86868b" },
  ...props
}) => (
  <XAxis
    dataKey={dataKey}
    stroke={stroke}
    fontSize={fontSize}
    tickLine={tickLine}
    axisLine={axisLine}
    tick={tick}
    {...props}
  />
);

const EnhancedYAxis: React.FC<ChartAxisProps> = ({
  stroke = "#86868b",
  fontSize = 12,
  tickLine = false,
  axisLine = false,
  domain = ["dataMin - 5", "dataMax + 5"],
  tick = { fontSize: 12, fill: "#86868b" },
  ...props
}) => (
  <YAxis
    stroke={stroke}
    fontSize={fontSize}
    tickLine={tickLine}
    axisLine={axisLine}
    domain={domain}
    tick={tick}
    {...props}
  />
);

export {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  EnhancedXAxis as XAxis,
  EnhancedYAxis as YAxis,
};
