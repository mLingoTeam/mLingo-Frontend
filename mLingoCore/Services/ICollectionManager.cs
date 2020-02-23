﻿using System.Collections.Generic;
using System.Threading.Tasks;
using mLingoCore.Models.Api.Base;
using mLingoCore.Models.Forms.Collections;

namespace mLingoCore.Services
{
    public interface ICollectionManager
    {
        KeyValuePair<ApiResponse, int> Find(string id, string name);

        KeyValuePair<ApiResponse, int> UserCollections(string username);

        Task<KeyValuePair<ApiResponse, int>> Create(string username, CreateCollectionFormModel newCollectionData);

        Task<KeyValuePair<ApiResponse, int>> Update(string id, string username, UpdateCollectionFormModel updatedCollection);

        KeyValuePair<ApiResponse, int> Delete(string id);
    }
}
