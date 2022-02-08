
/**
 * Check if running on Azure Devops Pipelines using the TF_BUILD variable.
 * See https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
 * 
 * @returns True, if the variable exists and is true 
 */
export function runningOnAzurePipeline(): boolean {
  return process.env.TF_BUILD === 'True'
}
