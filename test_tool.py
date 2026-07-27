from tools.web_search_tool import WebSearchTool

web = WebSearchTool()

result = web.invoke(
    "Who is the current Minister of Finance of Morocco?"
)

print("=" * 80)
print("ANSWER")
print("=" * 80)
print(result["answer"])

print("\n")

print("=" * 80)
print("SOURCES")
print("=" * 80)

for source in result["sources"]:
    print(f"- {source['title']}")
    print(f"  {source['url']}\n")