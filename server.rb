require 'sinatra'

get '/some_random_number' do
  sleep(3)
  rand(10000).to_s
end

get '/mult/:x/:y' do |x, y|
  sleep(3)
  (x.to_i * y.to_i).to_s
end

get '/' do
  File.read(File.join('public', 'index.html'))
end