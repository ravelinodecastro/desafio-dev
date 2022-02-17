

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Desafio Dev - Ravelino de Castro</title>
  <link href="/assets/css/app.css" rel="stylesheet">

</head>
<body>
  <div class="container">
    <h2>Faça o Upload do Ficheiro TXT</h2>
    <p class="lead">Apenas ficheiro no padrão deste<b>desafio</b></p>
  
    <!-- Upload  -->
    <form id="file-upload-form" class="uploader" action="/api/transactions/upload">
      <input id="file-upload" type="file" name="fileUpload" accept="text/plain" />
  
      <label for="file-upload" id="file-drag">
        <div id="start">
          <i class="fa fa-download" aria-hidden="true"></i>
          <div>Clique em selecionar ou arraste para aqui</div>
          <div id="notimage" class="hidden">Ficheiro com formato inválido</div>
          <span id="file-upload-btn" class="btn btn-primary">Selecionar</span>
        </div>
        <div id="response" class="hidden">
          <div id="messages"></div>
          <progress class="progress" id="file-progress" value="0">
            <span>0</span>%
          </progress>
        </div>
      </label>
    </form>
  </div>
  <div class="container">
    <table class="styled-table">
      <thead>
          <tr>
              <th>Id</th>
              <th>Data</th>
              <th>Hora</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>CPF</th>
              <th>Cartão</th>
              <th>Dono da Loja</th>
              <th>Nome do Dono</th>
              <th>Total</th>
          
          </tr>
      </thead>
      <tbody>
        @if (count($transactions)==0)
        <tr>
          <td colspan="10">Sem transações carregadas...</td>
        </tr>
        @endif
        @foreach ($transactions as $item)
      
          <tr>
            <td>{{$item->id}}</td>
            <td>{{$item->processed_at->format('d-m-Y')}}</td>
            <td>{{$item->processed_at->format('G:i')}}</td>
            <td>{{$item->description}}</td>
            <td>{{$item->amount}} R$</td>
            <td>{{$item->recipient->cpf}}</td>
            <td>{{$item->recipient->card}}</td>
            <td>{{$item->store->owner_name}}</td>
            <td>{{$item->store->name}}</td>
            <td>{{$item->store->amount}} R$</td>
          </tr>
          @endforeach
      </tbody>
    </table>
  </div>

 
  <script src="/assets/js/app.js"></script>
</body>
</html>