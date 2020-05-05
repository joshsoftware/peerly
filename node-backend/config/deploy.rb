require 'mina/rails'
require 'mina/git'
require 'json'

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)
server = ENV['on'] || 'staging'
branch = ENV['branch'] || 'master'

set :repository, 'git@github.com:joshsoftware/peerly.git'
set :branch, branch
set :user, 'ubuntu'
set :forward_agent, true
set :term_mode, :pretty
set :node_version, 'v12.16.2'

if server == 'staging'
  set :domain, 'ec2-18-216-79-5.us-east-2.compute.amazonaws.com'
  set :deploy_to, '/www/peerly-nodejs-backend'
end

# Optional settings:
#   set :user, 'foobar'          # Username in the server to SSH to.
#   set :port, '30000'           # SSH port number.
#   set :forward_agent, true     # SSH forward_agent.

# Shared dirs and files will be symlinked into the app-folder by the 'deploy:link_shared_paths' step.
# Some plugins already add folders to shared_dirs like `mina/rails` add `public/assets`, `vendor/bundle` and many more
# run `mina -d` to see all folders and files already included in `shared_dirs` and `shared_files`
# set :shared_dirs, fetch(:shared_dirs, []).push('public/assets')
# set :shared_files, fetch(:shared_files, []).push('config/database.yml', 'config/secrets.yml')
set :shared_dirs, fetch(:shared_dirs, []).push('node-backend/node_modules')
set :shared_files, fetch(:shared_files, []).push('node-backend/.env')

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
# task :environment do
# end

# Put any custom mkdir's in here for when `mina setup` is ran.
# all releases.

namespace :nvm do
  task :install_nvm do
    command %{echo "-----> Installing Node Version Manager"}
    command %{curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash}
  end

  task :install_node do
    # Specifying a Node.js version
    # copy from: https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
    #
    # Use the engines section of your package.json
    # {
    #   "name": "myapp",
    #   "description": "a really cool app",
    #   "version": "0.0.1",
    #   "engines": {
    #     "node": "0.10.x"
    #   }
    # }

    package = File.read("package.json")
    config = JSON.parse(package)

    if config['engines'] && config['engines']['node']
      set :node_version, config['engines']['node']
    end

    # Install Node.js via Node Version Manager
    # and symlink it to project_dir/.bin

    command %{
      echo "-----> Install node v.#{node_version!}"
      nvm install #{node_version!}
      ln -s ${NVM_BIN} ./.bin
    }
  end

  task :load do
    command %{echo "-----> Loading nvm"}
    command %{
      source ~/.nvm/nvm.sh
    }
    command %{echo "-----> Now using nvm v.`nvm --version`"}
  end
end

task :setup do
  # enter the block, only if "$HOME/.nvm/nvh.sh" file does not exist
  file_exists = system("echo [[ -f $HOME/.nvm/nvm.sh ]]")

  unless file_exists
    command %{ echo "NVM installation not found!" }

    # invoke :'nvm:install_nvm'
    # invoke :'nvm:install_node'
  end

  invoke :'nvm:load'
  command %{npm i -g pm2}
end

task :remote_environment do
  invoke :'nvm:load'
end

desc "Deploys the current version to the server."
task :deploy => :remote_environment do
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    command %{cd node-backend && npm install}
    invoke :'deploy:cleanup'

    on :launch do
      invoke :'nvm:load'
      command %{pm2 restart server}
      command %{echo '#{fetch(:branch)}' > #{fetch(:current_path)}/node-backend/branch_deployed.txt}
    end
  end
end

# For help in making your deploy script, see the Mina documentation:
#
#  - https://github.com/mina-deploy/mina/tree/master/docs
