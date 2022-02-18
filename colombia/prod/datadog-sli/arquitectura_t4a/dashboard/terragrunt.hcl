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
dependency "datadog-slo-actionslog" {
  config_path = "../slo/actionslog"
}
//fin

inputs = {
  dashboard_attributes = [
    //begin[
  {
    "title": "SLI - ARQUITECTURA_T4A - CLI (Terraform)",
    "description": "Dashboard generado desde Siigo.Cli. ",
    "free_texts": [
      {
        "layout": {
          "x": 16,
          "y": 1,
          "width": 24,
          "height": 6
        },
        "definition": {
          "type": "free_text",
          "text": "Métrica de errores http 5xx ",
          "color": "#4d4d4d",
          "font_size": "36",
          "text_align": "left"
        }
      },
      {
        "layout": {
          "x": 78,
          "y": 1,
          "width": 24,
          "height": 6
        },
        "definition": {
          "type": "free_text",
          "text": "Métrica de Latencia ",
          "color": "#4d4d4d",
          "font_size": "36",
          "text_align": "left"
        }
      }
    ],
    "slos": [
      {
        "layout": {
          "x": 1,
          "y": 9,
          "width": 60,
          "height": 21
        },
        "definition": {
          "title": "",
          "title_size": "16",
          "title_align": "left",
          "type": "slo",
          "view_type": "detail",
          "time_windows": [
            "7d",
            "previous_month",
            "global_time"
          ],
          "slo_id": "${dependency.datadog-slo-actionslog.outputs.metric_based_slo.ISIIGOactionslogCLI-Less-than-0_1-are-5xx-4xx-Terraform}",
          "show_error_budget": true,
          "view_mode": "overall",
          "global_time_target": "99.75"
        }
      },
      {
        "layout": {
          "x": 1,
          "y": 30,
          "width": 60,
          "height": 21
        },
        "definition": {
          "title": "",
          "title_size": "16",
          "title_align": "left",
          "type": "slo",
          "view_type": "detail",
          "time_windows": [
            "7d",
            "previous_month",
            "global_time"
          ],
          "slo_id": "${dependency.datadog-slo-actionslog.outputs.metric_based_slo.ISIIGOactionslogCLI-Less-than-0_1-are-5xx-4xx-Terraform}",
          "show_error_budget": true,
          "view_mode": "overall",
          "global_time_target": "99.75"
        }
      },
      {
        "layout": {
          "x": 1,
          "y": 51,
          "width": 60,
          "height": 21
        },
        "definition": {
          "title": "",
          "title_size": "16",
          "title_align": "left",
          "type": "slo",
          "view_type": "detail",
          "time_windows": [
            "7d",
            "previous_month",
            "global_time"
          ],
          "slo_id": "${dependency.datadog-slo-actionslog.outputs.metric_based_slo.ISIIGOactionslogCLI-Less-than-0_1-are-5xx-4xx-Terraform}",
          "show_error_budget": true,
          "view_mode": "overall",
          "global_time_target": "99.75"
        }
      }
    ],
    "monitors": [],
    "timeseries": [],
    "servicemap": [],
    "template_variables": [],
    "layout_type": "free",
    "is_read_only": false,
    "notify_list": [],
    "id": "h4s-f5e-qjh",
    "dependencies": []
  }
]//end
}
