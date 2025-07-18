const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_TOKEN = process.env.EXPO_PUBLIC_HF_TOKEN;
const DEFAULT_MODEL = "meta-llama/Llama-3-8B-Instruct";

export async function generateRecipeFromIngredients(
  ingredients: string[],
  model?: string
): Promise<string> {
  // MOCK: Return a pretty, formatted recipe string
  await new Promise((res) => setTimeout(res, 800)); // simulate network delay
  return `Delicious ${ingredients.join(" & ")} Surprise\n\nIngredients:\n- ${ingredients.join("\n- ")}\n\nInstructions:\n1. Prepare all ingredients.\n2. Mix them together.\n3. Cook with love.\n4. Serve and enjoy!`;
}
