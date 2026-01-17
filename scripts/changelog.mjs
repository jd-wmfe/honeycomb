#!/usr/bin/env node

/**
 * 自动生成 CHANGELOG 脚本
 * 基于 conventional commits 自动生成更新日志
 */

import { execSync } from "child_process";
import { consola } from "consola";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");
const changelogPath = join(rootDir, "CHANGELOG.md");

try {
  consola.info("正在生成 CHANGELOG...");

  // 如果 CHANGELOG.md 不存在，创建一个空文件
  if (!existsSync(changelogPath)) {
    writeFileSync(changelogPath, "# Changelog\n\n", "utf-8");
    consola.info("已创建 CHANGELOG.md 文件");
  }

  // 使用 conventional-changelog 生成 changelog
  // -p angular: 使用 angular preset（支持 feat, fix, breaking changes 等）
  // -i CHANGELOG.md: 输入文件
  // -s: 写入到输入文件（原地更新）
  execSync("conventional-changelog -p angular -i CHANGELOG.md -s", {
    cwd: rootDir,
    stdio: "inherit",
  });

  consola.success("CHANGELOG 生成成功！");
} catch (error) {
  consola.error(`生成 CHANGELOG 失败: ${error.message}`);
  process.exit(1);
}
