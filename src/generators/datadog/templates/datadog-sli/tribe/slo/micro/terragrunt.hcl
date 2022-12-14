terraform {
  source = "git::https://SiigoDevOps@dev.azure.com/SiigoDevOps/Architecture/_git/infrastructure-modules//datadog/datadog-slos?ref=datadog-slos-v0.0.1"
}

include {
  path = find_in_parent_folders("terragrunt_datadog.hcl")
}

inputs = {
  metric_based_slo_attributes = [
    {
      "name" : "ISIIGO<%= config.microserviceName %>CLI-Less-than-0_1-are-5xx-4xx-Terraform",
      "type" : "metric",
      "description" : "",
      "numerator" : "(sum:trace.aspnet_core.request.hits{env:aksqa AND service:ms-<%= config.microserviceName %> AND (http.status_code:2* OR http.status_code:3*) AND NOT resource_name:get_/health}.as_count())",
      "denominator" : "(sum:trace.aspnet_core.request.hits{env:aksqa AND service:ms-<%= config.microserviceName %> AND (http.status_code:1* OR http.status_code:2* OR http.status_code:3* OR http.status_code:5*) AND NOT resource_name:get_/health}.as_count())",
      "thresholds" = [
        {
          "timeframe" : "7d",
          "target" : 99.9,
          "warning" : 99.99,
          "target_display" : "99.900",
          "warning_display" : "99.990"
        },
        {
          "timeframe" : "30d",
          "target" : 99.9,
          "warning" : 99.95,
          "target_display" : "99.900",
          "warning_display" : "99.950"
        },
        {
          "timeframe" : "90d",
          "target" : 99.9,
          "warning" : 99.99,
          "target_display" : "99.900",
          "warning_display" : "99.950"
        }
      ]
    },
  ]
  monitor_based_slo_attributes = []
}
