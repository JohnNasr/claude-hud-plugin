# Agent HUD Plugin for Claude Desktop

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)]()

A live agent activity panel for Claude Desktop that shows all running tasks and subagents in real-time.

## 🚀 Features

- Live task status tracking with auto-refresh
- Real-time agent activity in sidebar
- Clear status indicators: Running, Waiting, Completed, Blocked
- Statistics showing Active/Done/Total counts
- Click-to-expand task details
- Progress bars for running agents

## 📦 Installation

### Option 1: Using the .plugin file

1. Download `claude-hud-plugin.plugin`
2. Rename to `claude-hud-plugin.zip`
3. Extract the zip file
4. Copy the folder to your Claude plugins directory:
   - **Windows:** `%APPDATA%\Claude\plugins\`
   - **macOS:** `~/Library/Application Support/Claude/plugins/`
   - **Linux:** `~/.config/Claude/plugins/`

### Option 2: Manual installation

1. Create a folder: `%APPDATA%\Claude\plugins\claude-hud-plugin\`
2. Copy all files into that folder:
   - `hud-plugin.json`
   - `HUDPanel.tsx`
   - `README.md`
3. Restart Claude Desktop
4. Enable in Settings → Plugins

## 🔧 Development

Clone and set up locally:

```bash
git clone https://github.com/your-username/claude-hud-plugin.git
cd claude-hud-plugin
# Files are pre-configured for Claude Desktop plugin system
```

## 📝 Configuration

Edit `hud-plugin.json` to customize:

| Setting | Default | Description |
|---------|---------|-------------|
| `width` | 320 | Sidebar panel width in pixels |
| `refreshInterval` | 3000 | Auto-refresh in milliseconds |
| `permissions` | read/write | Task permissions |

## 🔄 Integration with Subagent Skill

This plugin works seamlessly with the `/subagent` skill:

1. Use `/subagent` to launch parallel work
2. Each task appears in the HUD
3. Watch real-time progress as subagents complete
4. Click any task to view details

## 📚 Usage Example

```javascript
// Create tasks
await TaskCreate({ subject: "Research API docs", description: "Read OpenAPI spec" });

// All tasks appear instantly in the HUD
// Status updates in real-time
```

## 🐛 Troubleshooting

**"Connection Error"**
- Check MCP permissions in Settings
- Ensure Task tools are enabled

**Tasks don't appear**
- Verify tasks were created with TaskCreate
- Check plugin is enabled
- Try the refresh button

**Panel not visible**
- Restart Claude Desktop after installation
- Enable in Settings → Plugins

## 🤝 Contributing

1. Fork the repository
2. Make your changes
3. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built for the Claude Desktop community to improve parallel workflow visibility.