terraform {
  source = "git::https://SiigoDevOps@dev.azure.com/SiigoDevOps/Architecture/_git/infrastructure-modules//datadog/datadog-dashboards?ref=datadog-dashboards-v0.0.2"
}

include {
  path = find_in_parent_folders("terragrunt_datadog.hcl")
}

dependencies {
  paths = ["../slo/*"]
}

//start_
//fin

inputs = {
  dashboard_attributes = [
    //begin[

  ]//end
}
