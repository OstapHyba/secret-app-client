<template>
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6">
        <h1 class="text-center">{{title}}</h1>
        <div class="datablock">
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Your secret</h6>
                        <small class="text-muted">secret text</small>
                    </div>
                </li>
                <hr>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Hash</h6>
                        <small class="text-muted">{{ $route.params.hash }}</small>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Expire after views</h6>
                        <small class="text-muted">2</small>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Expire after</h6>
                        <small class="text-muted">234</small>
                    </div>
                </li>
            </ul>
        </div> <!-- datablock -->
        <p class="text-left">
            <router-link :to="formPath" class="btn btn-secondary">«{{ $t('form.return' ) }}</router-link>
        </p>

      </div>
    </div>
</template>

<script src="./Result.js"></script>
<style src="./Result.scss" lang="scss" scoped></style>