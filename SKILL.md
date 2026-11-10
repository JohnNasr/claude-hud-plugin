---
name: claude-desktop-hud
description: Plugin skill for integrating Agent HUD as a native Claude Desktop sidebar panel
type: plugin
---

# Claude Desktop Agent HUD Plugin

## Overview

This plugin adds a live Agent Activity HUD panel to Claude Desktop's sidebar, showing all executing subagents and their status in real-time.

## Installation

1. Save the `HUDPanel.tsx` and `hud-plugin.json` files to your Claude plugins directory
2. Restart Claude Desktop
3. Enable the "Agent HUD" plugin in the settings

## Usage

Once installed, the HUD appears as:
- A dedicated tab in the sidebar (next to Files, Tasks, etc.)
- Updates automatically every 3 seconds
- Shows all active/in_progress/completed tasks from the task system
- Includes a manual refresh button

## Features

- Live task status tracking
- Progress bars for running agents
- Status colors: Running (yellow), Done (green), Blocked (red), Pending (gray)
- Statistics showing Active/Done/Total counts
- Click any task to see details
- Refresh button for manual updates

## Integration Points

The HUD connects to:
- `TaskList` - to get current task status
- `TaskCreate` - to display new tasks created via Claude
- Subagent sessions - to show parallel work progress

## Customization

Edit `hud-config.json` to:
- Change refresh interval
- Modify status colors
- Select which tasks to display (filter by type, owner, etc.)
- Toggle statistics bar visibility

## Troubleshooting

If the HUD shows "Connection Error":
1. Check that the TaskList MCP tool is available
2. Try clicking the refresh button
3. Restart the plugin from settings

If tasks don't appear:
1. Ensure tasks were created with `TaskCreate`
2. Wait 5 seconds for auto-refresh
3. Check the Claude console for errors