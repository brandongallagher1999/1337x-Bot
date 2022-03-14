

variable "username" {
    description = "Username for DockerHub"
    type = string
    sensitive = true
}

variable "password" {
    description = "Password for DockerHub"
    type = string
    sensitive = true
}