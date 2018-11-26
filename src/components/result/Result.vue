<template>
    <div class="row justify-content-center">
      <div class="col-xs-12 col-sm-10 col-md-6">
        <h1 class="text-center">{{title}}</h1>

        <div v-if="!isReady">
            <div class="lds-css ng-scope">
                <div style="width:100%;height:100%" class="lds-rolling">
                    <div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div class="datablock">
                <ul class="list-group mb-3">
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Your secret</h6>
                            <small class="text-muted">{{ result.secret }}</small>
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
                            <small class="text-muted">{{ result.expireAfterViews }}</small>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Expire after</h6>
                            <small class="text-muted">{{ result.expireAfter }}</small>
                        </div>
                    </li>
                    <li class="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 class="my-0">Created at</h6>
                            <small class="text-muted">{{ result.createdAt }}</small>
                        </div>
                    </li>
                </ul>
            </div> <!-- datablock -->
            <p class="text-left">
                <router-link :to="formPath" class="btn btn-secondary">«{{ $t('form.return' ) }}</router-link>
            </p>
        </div>
      </div>
    </div>
</template>

<script src="./Result.js"></script>
<style src="./Result.scss" lang="scss" scoped></style>