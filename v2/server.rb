require 'sinatra'

get '/word/:upc' do |upc|
  sleep 8
  lines = File.foreach('/usr/share/dict/words').first(50000)
  word = lines.sample
  word = word.upcase if upc == 'y' 
  [200, word]
end

get '/' do
  File.read('public/index.html')
end